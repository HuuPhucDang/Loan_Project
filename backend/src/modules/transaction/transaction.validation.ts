import Joi from "joi";
import { objectId } from "../../helper/validate/custom.validation";

export const actionMoney = {
  body: Joi.object()
    .keys({
      amount: Joi.number().required(),
      userId: Joi.string().required(),
    })
    .min(1),
  params: Joi.object().keys({
    transactionId: Joi.string().custom(objectId),
  }),
};

export const requestMoney = {
  body: Joi.object()
    .keys({
      amount: Joi.number().required(),
      withdrawPassword: Joi.string().required(),
    })
    .min(1),
};

export const rechargeMoney = {
  body: Joi.object()
    .keys({
      amount: Joi.number().required(),
    })
    .min(1),
};

export const updateTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.string().custom(objectId),
  }),
};

export const fetchTransactions = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    type: Joi.string(),
    status: Joi.string(),
    populate: Joi.string(),
  }),
};
