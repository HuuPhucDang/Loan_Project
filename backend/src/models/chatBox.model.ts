import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import {
  IChatBoxDoc,
  IChatBoxModel,
  EChatBox,
} from "../interfaces/chatBox.interface";

const chatboxSchema = new mongoose.Schema<IChatBoxDoc, IChatBoxModel>(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: mongoose.Schema.Types.String,
      enum: EChatBox,
      default: EChatBox.UNREAD,
    },
    messages: [
      {
        type: mongoose.Schema.Types.String,
        ref: "ChatMessage",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
chatboxSchema.plugin(toJSON);

const ChatBox = mongoose.model<IChatBoxDoc>("ChatBox", chatboxSchema);
export { chatboxSchema };
export default ChatBox;
