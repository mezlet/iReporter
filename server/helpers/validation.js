import Joi from 'joi';

export const incidentSchema = Joi.object().keys({
  type: Joi.string().valid(['red-flag']).required(),
  location: Joi.string().regex(/[a-zA-Z0-9]/).required(),
  createdby: Joi.number().integer().required(),
  comment: Joi.string().regex(/[a-zA-Z0-9]/).required(),
});

export const commentSchema = Joi.object().keys({
  comment: Joi.string().regex(/[a-zA-Z0-9]/).required(),
});

export const locationSchema = Joi.object().keys({
  comment: Joi.string().regex(/[a-zA-Z0-9]/).required(),
});
