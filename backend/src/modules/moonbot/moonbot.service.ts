import _ from "lodash";
import mongoose from "mongoose";
import Moonboot from "../../models/moonbot.model";
import { IMoonbotDoc } from "../../interfaces/moonbot.interface";

export const fetchAllCoins = async (): Promise<IMoonbotDoc[]> => {
  return await Moonboot.find();
};

export const updateMoonbot = async (
  id: string,
  updateBody: any
): Promise<IMoonbotDoc | null> => {
  const moonboot = await Moonboot.findById({
    id: new mongoose.Types.ObjectId(id),
  });
  if (!moonboot) return null;
  Object.assign(moonboot, updateBody)
  return await moonboot.save();
};
