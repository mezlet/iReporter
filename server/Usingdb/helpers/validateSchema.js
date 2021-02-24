import Joi from 'joi';

export const signup = Joi.object().keys({
  firstname: Joi.string().trim(true).min(3).max(30)
    .required(),
  lastname: Joi.string().trim(true).min(3).max(30)
    .required(),
  othernames: Joi.string().trim(true).min(3).max(30)
    .required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  phonenumber: Joi.string().regex(/^\d{3}\d{3}\d{4}$/).min(10).required(),
  username: Joi.string().trim(true).min(3).max(30)
    .required(),
  password: Joi.string().trim(true).min(4).max(30)
    .required(),
});

export const record = Joi.object().keys({
  type: Joi.string().valid(['red-flag', 'intervention']).required(),
  location: Joi.string()
    .regex(/^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/)
    .required(),
  comment: Joi.string().trim(true).required(),
  image: Joi.string()
    .regex(/(\.jpg|\.jpeg|\.png|\.gif)$/i)
    .required(),
  video: Joi.string()
    .regex(/(\.mp4)$/i)
    .required(),
});

export const login = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().required(),
});

export const updateRecord = Joi.object().keys({
  type: Joi.string().valid(['red-flag', 'intervention']),
  location: Joi.string()
    .regex(/^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/),
  comment: Joi.string().trim(true).min(10),
  image: Joi.string(),
  video: Joi.string(),
});

export const updateComment = Joi.object().keys({
  comment: Joi.string().trim(true).min(3).required(),
});

export const updateLocation = Joi.object().keys({
  location: Joi.string()
    .regex(/^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/)
    .required(),
});

export const updateStatus = Joi.object().keys({
  status: Joi.string().valid(['pending', 'rejected', 'resolved', 'under-investigation']).required(),
});
