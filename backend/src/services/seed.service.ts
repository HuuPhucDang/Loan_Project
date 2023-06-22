import _ from "lodash";
import User from "../models/user.model";
import Wallet from "../models/wallet.model";
import Coin from "../models/coin.model";
import Moonbot from "../models/moonbot.model";
import {
  ECoinCoupleTrade,
  ETradeType,
} from "../interfaces/tradeHistoryHistory.interface";

const ADMIN_SEED_1 = {
  username: "binanceadmin",
  nickname: "binance admin",
  password: "M123456789",
  onwCode: "admin001",
  role: "admin",
};

const ADMIN_SEED_2 = {
  username: "0999666888",
  nickname: "super admin",
  password: "Mm123456789",
  onwCode: "admin002",
  role: "admin",
};

const ADMIN_SEED = [ADMIN_SEED_1, ADMIN_SEED_2];

/**
 * Create a Admin
 * @returns {Promise<void>}
 */
export const createSeedAdmin = async (): Promise<void> => {
  for (const admin of ADMIN_SEED) {
    const isExistAdmin = await User.isUsernameTaken(admin.username);
    if (!isExistAdmin) {
      const savedAdmin = await User.create(admin);
      await Wallet.create({
        balance: 0,
        benefit: 0.1,
        userId: savedAdmin.id,
      });
    }
  }
};

const ICON_LIST: { [key: string]: string } = {
  [ECoinCoupleTrade.BTCUSDT]:
    "https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg",
  [ECoinCoupleTrade.BNBUSDT]:
    "https://s3-symbol-logo.tradingview.com/crypto/XTVCBNB.svg",
  [ECoinCoupleTrade.ADAUSDT]:
    "https://s3-symbol-logo.tradingview.com/crypto/XTVCADA.svg",
  [ECoinCoupleTrade.DOGEUSDT]:
    "https://s3-symbol-logo.tradingview.com/crypto/XTVCDOGE.svg",
  [ECoinCoupleTrade.ETHUSDT]:
    "https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg",
  [ECoinCoupleTrade.LTCUSDT]:
    "https://s3-symbol-logo.tradingview.com/crypto/XTVCLTC.svg",
  [ECoinCoupleTrade.MATICUSDT]:
    "https://s3-symbol-logo.tradingview.com/crypto/XTVCMATIC.svg",
  [ECoinCoupleTrade.SOLUSDT]:
    "https://s3-symbol-logo.tradingview.com/crypto/XTVCSOL.svg",
  [ECoinCoupleTrade.TRXUSDT]:
    "https://s3-symbol-logo.tradingview.com/crypto/XTVCTRX.svg",
  [ECoinCoupleTrade.XRPUSDT]:
    "https://s3-symbol-logo.tradingview.com/crypto/XTVCXRP.svg",
};

/**
 * Create a Coin
 * @returns {Promise<void>}
 */
export const createSeedCoins = async (): Promise<void> => {
  const allCoins = Object.keys(
    ECoinCoupleTrade
  ) as (keyof typeof ECoinCoupleTrade)[];

  for (const symbol of allCoins) {
    const isCoinExist = await Coin.isCoinExits(symbol);
    if (!isCoinExist) await Coin.create({ symbol, icon: ICON_LIST[symbol] });
  }
};

const MOONBOT_TYPES = [30, 60, 120, 150];
const MOONBOT_LIMITED = [15, 15, 15, 15];
const MOONBOT_PROBABILITY = [0.1, 0.2, 0.3, 0.5];

const MOONBOT_BUY_NAMES = ["buy1", "buy2", "buy3", "buy4"];

const MOONBOT_SELL_NAMES = ["sell1", "sell2", "sell3", "sell4"];

/**
 * Create a Coin
 * @returns {Promise<void>}
 */
export const createSeedMoonbots = async (): Promise<void> => {
  for (const name of MOONBOT_BUY_NAMES) {
    const index = MOONBOT_BUY_NAMES.indexOf(name);
    const isExistMoonbot = await Moonbot.findOne({ name });
    if (!isExistMoonbot)
      await Moonbot.create({
        name,
        time: MOONBOT_TYPES[index],
        limitedTime: MOONBOT_LIMITED[index],
        probability: MOONBOT_PROBABILITY[index],
        type: ETradeType.BUY,
      });
  }
  for (const name of MOONBOT_SELL_NAMES) {
    const index = MOONBOT_SELL_NAMES.indexOf(name);
    const isExistMoonbot = await Moonbot.findOne({ name });;
    if (!isExistMoonbot)
      await Moonbot.create({
        name,
        time: MOONBOT_TYPES[index],
        limitedTime: MOONBOT_LIMITED[index],
        probability: MOONBOT_PROBABILITY[index],
        type: ETradeType.SELL,
      });
  }
};
