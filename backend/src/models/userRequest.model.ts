import mongoose from "mongoose";
import moment from "moment";
import paginate from "../helper/paginate/paginate";
import toJSON from "../helper/toJSON/toJSON";
import {
  IUserRequestDoc,
  ERequestType,
  IUserRequestModel,
} from "../interfaces/userRequest.interface";

const userRequestSchema = new mongoose.Schema<
  IUserRequestDoc,
  IUserRequestModel
>(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    date: {
      type: mongoose.Schema.Types.String,
      default: moment().format("YYYY-MM-DD"),
    },
    time: {
      type: mongoose.Schema.Types.String,
      default: moment().format("HH:mm:ss"),
    },
    type: {
      type: mongoose.Schema.Types.String,
      enum: ERequestType,
    },
    message: {
      type: mongoose.Schema.Types.String,
    },
    link: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userRequestSchema.plugin(toJSON);
userRequestSchema.plugin(paginate);

const UserRequest = mongoose.model<IUserRequestDoc, IUserRequestModel>(
  "UserRequest",
  userRequestSchema
);
export { userRequestSchema };
export default UserRequest;
