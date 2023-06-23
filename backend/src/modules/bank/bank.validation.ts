import Joi from "joi";

export const activeBank = {
  body: Joi.object().keys({
    fullname: Joi.string().required(),
    accountNumber: Joi.string().required(),
    bankName: Joi.string().required(),
    bankAddress: Joi.string().required(),
  }),
};
