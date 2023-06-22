import Joi from "joi";

export const requestForgotPassword = {
  body: Joi.object()
    .keys({
      username: Joi.string().required(),
      message: Joi.string().required(),
    })
    .min(1),
};


export const fetchUserRequests = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};
