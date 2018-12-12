import Joi from 'joi';

const validate = (data, schema) => new Promise((resolve, reject) => {
  const { error, value } = Joi.validate(data, schema);
  if (error) return reject(error);
  return resolve(value);
});

export default validate;
