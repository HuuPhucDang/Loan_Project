import Joi from "joi";
import { objectId } from "../../helper/validate/custom.validation";

export const updateSystemInfor = {
  params: Joi.object().keys({
    inforId: Joi.string().custom(objectId),
  }),
  file:  Joi.object().keys({
    QRCode: Joi.binary().required(),
  }),
  body: Joi.object().keys({
    accountNumber: Joi.string().required(),
    bankName: Joi.string().required(),
    message: Joi.string().required(),
    fullname: Joi.string().required(),
  }),
};
