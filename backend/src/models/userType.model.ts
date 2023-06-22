import mongoose from "mongoose";
import toJSON from "../helper/toJSON/toJSON";
import {
  EUserType,
  IUserTypeDoc,
  IUserTypeModel,
} from "../interfaces/userType.interface";

const userTypeSchema = new mongoose.Schema<IUserTypeDoc, IUserTypeModel>(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: mongoose.Schema.Types.String,
    },
    type: {
      type: mongoose.Schema.Types.String,
      enum: EUserType,
      default: EUserType.BEGINNER,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userTypeSchema.plugin(toJSON);

const UserType = mongoose.model<IUserTypeDoc>("UserType", userTypeSchema);
export { userTypeSchema };
export default UserType;
