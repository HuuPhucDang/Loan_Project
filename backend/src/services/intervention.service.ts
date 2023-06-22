import { Socket } from "socket.io";
import fetch from "node-fetch";
import mongoose from "mongoose";
import {
  ETradeType,
  ETradeResult,
} from "../interfaces/tradeHistoryHistory.interface";
import _ from "lodash";
import Coin from "../models/coin.model";
import TradeHistory from "../models/tradeHistory.model";
import Wallet from "../models/wallet.model";
import Moonboot from "../models/moonbot.model";
import TradeNotification from "../models/tradeNotification.model";
import ExchangeCurrency from "../models/exchangeCurrency.model";
import moment from "moment";

const KLINE_URL = `https://api.binance.com/api/v3/uiKlines?`;
const AGGREGATE_URL = `https://api.binance.com/api/v3/aggTrades?`;
const GET_TICKER_24H = `https://api.binance.com/api/v3/ticker/24hr?`;
const GET_PRICE_URL = `https://api.binance.com/api/v3/avgPrice?symbol=`;

let moonBootInterval: any = {};

const checkResults = (
  bet: number,
  newPrice: number,
  type: ETradeType
): ETradeResult => {
  switch (type) {
    case ETradeType.BUY: {
      if (bet <= newPrice) return ETradeResult.LOSE;
      else return ETradeResult.WIN;
    }
    default: {
      if (bet >= newPrice) return ETradeResult.LOSE;
      else return ETradeResult.WIN;
    }
  }
};

export const startmoonBootInterval = async () => {
  const moonbots = await Moonboot.find();
  for (const moonbot of moonbots) {
    let countDown = moonbot.time;
    let frezzeTime = moonbot.limitedTime;
    moonBootInterval[moonbot.id] = setInterval(() => {
      if (countDown === 0) {
        frezzeTime -= 1;
      } else {
        countDown -= 1;
      }
      if (frezzeTime === 0) {
        countDown = moonbot.time;
        frezzeTime = moonbot.limitedTime;
      }
      global.io.emit("updateCountDown", {
        time: countDown,
        id: moonbot.id,
        isFrezze: frezzeTime < moonbot.limitedTime,
        frezzeTime,
      });
    }, 1000);
  }
};

const intiChartSocket = (socket: Socket) => {
  socket.on("interventionCoin", async (data: any) => {
    const updateCoin = await Coin.findOne({ symbol: data?.symbol });
    if (updateCoin) {
      if (data?.intervention) {
        updateCoin.intervention = updateCoin.intervention + data.intervention;
        const newPrice = updateCoin.price + Number(data?.intervention);
        const newGrowth = ((newPrice - updateCoin.price) / newPrice) * 100;
        updateCoin.growth = parseFloat(newGrowth.toFixed(2));
        updateCoin.price = parseFloat(newPrice.toFixed(4));
      } else {
        updateCoin.intervention = 0;
        const updateUrl = `${GET_PRICE_URL}${data?.symbol}`;
        const response = await fetch(updateUrl);
        const newCoins: any = await response.json();
        const newPrice = Number(newCoins?.price);
        const newGrowth = ((newPrice - updateCoin.price) / newPrice) * 100;
        updateCoin.growth = parseFloat(newGrowth.toFixed(2));
        updateCoin.price = parseFloat(newPrice.toFixed(4));
      }
      await updateCoin.save();
      const allCoins = await Coin.find().sort({ price: -1 });
      global.io.emit("updateAllCoinPriceNow", allCoins);
    }
  });
  socket.on("getLatestCoins", async (_data: any, callback: any) => {
    const allCoins = await Coin.find().sort({ price: -1 });
    callback(allCoins);
  });
  socket.on("getCoinWithSymbol", async (data: any, callback: any) => {
    const coin = await Coin.findOne({ symbol: data?.symbol });
    callback(coin);
  });
  socket.on("getLatestCoinWithSymbol", async (data: any, callback: any) => {
    const coin = await Coin.findOne({ symbol: data?.symbol });
    callback(coin);
  });
  socket.on("getAllMoonboot", async (_data: any, callback: any) => {
    const moonboot = await Moonboot.find();
    callback(moonboot);
  });
  socket.on("updateMoonbot", async (data: any) => {
    const moonboot = await Moonboot.findById(data?.id);
    if (moonboot) {
      Object.assign(
        moonboot,
        _.pick(data, "time", "limitedTime", "probability")
      );
      await moonboot.save();
      if (moonBootInterval[moonboot.id]) {
        clearInterval(moonBootInterval[moonboot.id]);
        let countDown = moonboot.time;
        let frezzeTime = moonboot.limitedTime;
        moonBootInterval[moonboot.id] = setInterval(() => {
          if (countDown === 0) {
            frezzeTime -= 1;
          } else {
            countDown -= 1;
          }
          if (frezzeTime === 0) {
            countDown = moonboot.time;
            frezzeTime = moonboot.limitedTime;
          }
          global.io.emit("updateCountDown", {
            time: countDown,
            id: moonboot.id,
            isFrezze: frezzeTime < moonboot.limitedTime,
            countDown,
          });
        }, 1000);
      }
    }
    const moonboots = await Moonboot.find();
    global.io.emit("updateAllMoonbotNow", moonboots);
  });
  socket.on("exchangeCurrency", async (data: any, callback: any) => {
    const result = await ExchangeCurrency.findOne({ symbol: data?.symbol });
    callback(result?.price);
  });
  socket.on("getCoin24h", async (data: any, callback: any) => {
    const currentCoin = await Coin.findOne({ symbol: data?.symbol });
    if (currentCoin) {
      const fetchUrl = `${GET_TICKER_24H}symbol=${data?.symbol}`;
      const response = await fetch(fetchUrl);
      const list: any = await response.json();
      const newPrice = Number(list?.lastPrice) + currentCoin.intervention;
      const newHighestPrice =
        Number(list?.highPrice) < newPrice ? newPrice : Number(list?.highPrice);
      const resolveList = {
        ...list,
        lastPrice: newPrice.toFixed(4),
        highPrice: newHighestPrice.toFixed(4),
      };
      callback(resolveList);
    }
  });
  socket.on("checkTradeResult", async (data: any) => {
    const trade = await TradeHistory.findById(
      new mongoose.Types.ObjectId(data?.tradeId)
    );
    if (trade) {
      console.log(`WAITING CHECK TRADE FOR ${data?.timeout}`, data?.tradeId);
      setTimeout(async () => {
        const currentCoin = await Coin.findOne({ symbol: trade.symbol });
        if (currentCoin) {
          trade.result = checkResults(
            trade.betPrice,
            currentCoin.price,
            trade.type
          );
          const wallet = await Wallet.findOne({
            userId: new mongoose.Types.ObjectId(data?.userId),
          });
          await trade.save();
          if (wallet) {
            const amount = trade.betAmount * trade.probability;
            const recieveAmount = ETradeResult.LOSE
              ? trade.betAmount - amount
              : trade.betAmount + amount;
            const balanceResult = wallet.balance + recieveAmount;
            wallet.balance = balanceResult;
            await wallet.save();
            const firstText = trade.type === ETradeType.BUY ? "mua" : "bán";
            const resultText =
              trade.result === ETradeResult.LOSE ? "thua" : "thắng";
            const betPrice =
              trade.type === ETradeType.BUY ? trade.betPrice : -trade.betPrice;
            const notification = await TradeNotification.create({
              userId: new mongoose.Types.ObjectId(data?.userId),
              message: `Bạn đã <b>${resultText} ${amount}</b> USDT khi ${firstText} ${
                trade.symbol
              } ở mức <b>${betPrice}</b> lúc ${trade.betTime}, Mức giá ${
                trade.symbol
              } khi kết thúc lệnh là <b>${
                currentCoin.price
              }</b> lúc ${moment().format("DD/MM/YYYY HH:mm:ss")}`,
              time: trade.betTime,
            });
            global.io.emit("updateTradeListNow", {
              userId: trade.userId,
              balance: wallet?.balance,
            });
            global.io.emit("updateNewNotification", {
              userId: trade.userId,
              notification,
              trade,
            });
          }
        }
      }, data?.timeout || 1);
    }
  });
  socket.on("getAllTradeNotification", async (data: any, callback: any) => {
    const notifications = await TradeNotification.find({
      userId: new mongoose.Types.ObjectId(data?.userId),
    }).sort({ time: -1 });
    callback(notifications);
  });
  socket.on("getAggregateTradeList", async (data: any, callback: any) => {
    const coin = await Coin.findOne({ symbol: data?.symbol });
    if (coin) {
      const fetchUrl = `${AGGREGATE_URL}symbol=${data?.symbol}&limit=${
        data?.limit || 80
      }`;
      const response = await fetch(fetchUrl);
      const list: any = await response.json();
      const resolveResult = _.map(list, (el) => ({
        ...el,
        p: Number((parseFloat(el?.p) + coin.intervention).toFixed(4)),
        q: parseFloat(el?.q),
      }));
      callback(resolveResult);
    }
  });
  socket.on("getChartTradeList", async (data: any, callback: any) => {
    const coin = await Coin.findOne({ symbol: data?.symbol });
    if (coin) {
      const fetchUrl = `${KLINE_URL}symbol=${data?.symbol}&interval=${
        data?.interval
      }&limit=${data?.limit || 500}`;
      const response = await fetch(fetchUrl);
      const list: any = await response.json();
      const result: any = [];
      for (const item of list) {
        if (!result.length)
          result.push({
            open: coin.price,
            high: coin.price,
            low: coin.price,
            close: coin.price,
            time: item[0],
          });
        else
          result.push({
            open: parseFloat(item[1]) + coin.intervention,
            high: parseFloat(item[2]) + coin.intervention,
            low: parseFloat(item[3]) + coin.intervention,
            close: parseFloat(item[4]) + coin.intervention,
            time: item[0],
          });
      }
      callback(result);
    }
  });
};

export default intiChartSocket;
