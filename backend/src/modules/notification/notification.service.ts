import _ from "lodash";
import Notification from "../../models/notification.model";
import { INotificationDoc } from "../../interfaces/notification.interface";
import mongoose from "mongoose";

/**
 * Fetch all requests
 */
export const fetchAlNotifications = async (
  userId: mongoose.Types.ObjectId
): Promise<INotificationDoc[]> => {
  const userRequests = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .limit(10);
  return userRequests;
};
