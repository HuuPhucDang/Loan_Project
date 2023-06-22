import Joi from "joi";

export const createNewTrade = {
  body: Joi.object().keys({
    type: Joi.string(),
    betAmount: Joi.number().required(),
    betPrice: Joi.number().required(),
    symbol: Joi.string().required(),
    time: Joi.string().required(),
    probability: Joi.number().required(),
    index: Joi.number().required(),
  }),
};

