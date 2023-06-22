import mongoose from "mongoose";
import paginate from "../helper/paginate/paginate";
import toJSON from "../helper/toJSON/toJSON";
import {
  INotificationDoc,
  INotificationModel,
} from "../interfaces/notification.interface";

const notificationSchema = new mongoose.Schema<
  INotificationDoc,
  INotificationModel
>(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    message: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
notificationSchema.plugin(toJSON);
notificationSchema.plugin(paginate);

const Notification = mongoose.model<INotificationDoc, INotificationModel>(
  "Notification",
  notificationSchema
);
export { notificationSchema };
export default Notification;
