import Joi from "joi";
import { password } from "../../helper/validate/custom.validation";

export const verifyPhonenumber = {
  body: Joi.object()
    .keys({
      phonenumber: Joi.string().required(),
    })
    .min(1),
};

export const activeUserEmail = {
  body: Joi.object()
    .keys({
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    })
    .min(1),
};

export const changeUserEmail = {
  body: Joi.object()
    .keys({
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      newEmail: Joi.string().email().required(),
    })
    .min(1),
};

export const activeWithdrawPassword = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    withdrawPassword: Joi.string().min(8).required(),
  }),
};

export const changeWithdrawPassword = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    phonenumber: Joi.string().required(),
    email: Joi.string().email().required(),
    newWithdrawPassword: Joi.string().min(8).required(),
  }),
};

export const changeUserPassword = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    newPassword: Joi.string().required().custom(password),
    confirmNewPassword: Joi.string()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "any.only": "Confirm New Password must match with New Password",
      }),
  }),
};
