import _ from "lodash";
import User from "../models/user.model";
import Wallet from "../models/wallet.model";

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

