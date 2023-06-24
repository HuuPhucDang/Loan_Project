import Joi from "joi";
import { objectId } from "../../helper/validate/custom.validation";

export const updateTemplate = {
  params: Joi.object().keys({
    inforId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};

export const previewContract = {
  query: Joi.object().keys({
    money: Joi.number().integer(),
    month: Joi.number().integer(),
    interestRate: Joi.string(),
  }),
};