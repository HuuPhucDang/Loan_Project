import Joi from "joi";
import { password, objectId } from "../../helper/validate/custom.validation";

const createUserBody = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid("user", "admin"),
  }),
};

export const createUser = {
  body: Joi.object().keys(createUserBody),
};

export const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    populate: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

export const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      password: Joi.string().custom(password),
      fullname: Joi.string().optional(),
      idNumber: Joi.string().optional(),
      dob: Joi.string().optional(),
      gender: Joi.string().optional(),
      income: Joi.number().optional(),
      purpose: Joi.string().optional(),
      address: Joi.string().optional(),
      job: Joi.string().optional(),
      relativesPhoneNumber: Joi.string().optional(),
      relationshipWithRelatives: Joi.string().optional(),
    })
    .min(1),
};

export const updateSelf = {
  body: Joi.object().keys({
    fullname: Joi.string().required(),
    idNumber: Joi.string().required(),
    dob: Joi.string().required(),
    gender: Joi.string().required(),
    income: Joi.number().required(),
    purpose: Joi.string().required(),
    address: Joi.string().required(),
    job: Joi.string().required(),
    relativesPhoneNumber: Joi.string().required(),
    relationshipWithRelatives: Joi.string().required(),
  }),
};

export const updateUserAvavtar = {
  body: Joi.object()
    .keys({
      avatar: Joi.string().required(),
    })
    .min(1),
};

export const updateUserNickname = {
  body: Joi.object()
    .keys({
      nickname: Joi.string().required(),
    })
    .min(1),
};

export const updateUserType = {
  body: Joi.object()
    .keys({
      userType: Joi.string().required(),
    })
    .min(1),
};
