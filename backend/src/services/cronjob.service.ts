import _ from "lodash";
import CronJob from "node-cron";
import fetch from "node-fetch";
import { ECoinCoupleTrade } from "../interfaces/tradeHistoryHistory.interface";
import Coin from "../models/coin.model";
import ExchangeCurrency from "../models/exchangeCurrency.model";

const GET_PRICE_OF_TOP_TEN_URL = `https://api.binance.com/api/v3/ticker/price?symbols=`;
const EXCHANGE_CURRENCY = `https://www.okx.com/v3/c2c/tradingOrders/mostUsedPaymentAndBestPriceAds?`;

const initScheduledJobs = () => {
  const scheduledUpdateCoinPrice = CronJob.schedule(
    "*/30 * * * * *",
    async () => {
      console.info("===RUN CRON UPDATE PRICE OF TOP 10===");
      const allCoins = Object.keys(
        ECoinCoupleTrade
      ) as (keyof typeof ECoinCoupleTrade)[];
      const updateUrl = `${GET_PRICE_OF_TOP_TEN_URL}${JSON.stringify(
        allCoins
      )}`;
      const response = await fetch(updateUrl);
      const newCoins: any = await response.json();
      for (const coin of newCoins) {
        const updateCoin = await Coin.findOne({ symbol: coin?.symbol });
        if (updateCoin) {
          const newPrice = Number(coin?.price || "0") + updateCoin.intervention;
          const newGrowth = ((newPrice - updateCoin.price) / newPrice) * 100;
          updateCoin.growth = parseFloat(newGrowth.toFixed(2));
          updateCoin.price = parseFloat(newPrice.toFixed(4));
          await updateCoin.save();
        }
      }
      const allSavedCoins = await Coin.find().sort({ price: -1 });
      global.io.emit("updateAllCoinPriceNow", allSavedCoins);
    }
  );
  const scheduledUpdateExchangePrice = CronJob.schedule(
    "*/30 * * * * *",
    async () => {
      console.info("===RUN CRON UPDATE EXCHANGE CURRENCY===");
      const requestGetVNDUSDT = await fetch(
        `${EXCHANGE_CURRENCY}&cryptoCurrency=VND&fiatCurrency=USDT`
      );
      const reponseGetVNDUSDT: any = await requestGetVNDUSDT.json();
      const resultsVNDUSDT = Number(reponseGetVNDUSDT?.data[0]?.unitPrice);
      let findVNDUSDT = await ExchangeCurrency.findOne({ symbol: "VNDUSDT" });
      if (!findVNDUSDT)
        findVNDUSDT = await ExchangeCurrency.create({
          symbol: "VNDUSDT",
          price: resultsVNDUSDT,
          intervention: 0,
        });

      findVNDUSDT.price = resultsVNDUSDT;
      if (findVNDUSDT.intervention)
        findVNDUSDT.price = findVNDUSDT.price + findVNDUSDT.intervention;

      await findVNDUSDT.save();
      const requestGetUSDTVND = await fetch(
        `${EXCHANGE_CURRENCY}&cryptoCurrency=USDT&fiatCurrency=VND`
      );
      const reponseGetUSDTVND: any = await requestGetUSDTVND.json();
      const resultsUSDTVND = Number(reponseGetUSDTVND?.data[0]?.unitPrice);
      let findUSDTVND = await ExchangeCurrency.findOne({ symbol: "USDTVND" });

      if (!findUSDTVND)
        findUSDTVND = await ExchangeCurrency.create({
          symbol: "USDTVND",
          price: resultsUSDTVND,
          intervention: 0,
        });
      findUSDTVND.price = resultsUSDTVND;
      if (findUSDTVND.intervention)
        findUSDTVND.price = findUSDTVND.price + findUSDTVND.intervention;
      await findUSDTVND.save();
    }
  );
  scheduledUpdateCoinPrice.start();
  scheduledUpdateExchangePrice.start();
};

export default initScheduledJobs;
