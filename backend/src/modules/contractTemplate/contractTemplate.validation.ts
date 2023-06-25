import Joi from "joi";
import { objectId } from "../../helper/validate/custom.validation";

export const updateTemplate = {
  params: Joi.object().keys({
    contractId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    header: Joi.string().required(),
    nameOfContract: Joi.string().required(),
    sideA: Joi.string().required(),
    sideB: Joi.string().required(),
    terms: Joi.string().required(),
  }),
};

export const previewContract = {
  query: Joi.object().keys({
    money: Joi.number().integer(),
    month: Joi.number().integer(),
    interestRate: Joi.string(),
  }),
};
