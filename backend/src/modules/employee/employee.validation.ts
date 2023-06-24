import Joi from "joi";
import { objectId } from "../../helper/validate/custom.validation";

export const updateEmployee = {
  params: Joi.object().keys({
    employeeId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    fullname: Joi.string().required(),
    contact: Joi.string().required(),
  }),
};

export const createEmployee = {
  body: Joi.object().keys({
    fullname: Joi.string().required(),
    contact: Joi.string().required(),
  }),
};

export const updateContactList = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string()).required(),
  }),
};

export const previewContract = {
  query: Joi.object().keys({
    money: Joi.number().integer(),
    month: Joi.number().integer(),
    interestRate: Joi.string(),
  }),
};
