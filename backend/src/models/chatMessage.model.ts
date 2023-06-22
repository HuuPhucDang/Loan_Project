import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import {
  IChatMessageDoc,
  IChatMessageModel,
} from "../interfaces/chatMessage.interface";

const chatboxSchema = new mongoose.Schema<IChatMessageDoc, IChatMessageModel>(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: mongoose.Schema.Types.String,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatBox",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
chatboxSchema.plugin(toJSON);

const ChatBox = mongoose.model<IChatMessageDoc>("ChatMessage", chatboxSchema);
export { chatboxSchema };
export default ChatBox;
