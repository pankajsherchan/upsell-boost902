/* eslint-disable import/no-unresolved */

const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

const postValidationSchema = Joi.object().keys({
  date: Joi.string().required(),
  confNum: Joi.number().required(),
  rtc: Joi.string().required(),
  unitPrice: Joi.number().required(),
  numNights: Joi.number().required(),
  upgradedTo: Joi.string().required(),
  colleague: Joi.string().required(),
  remark: Joi.string().optional()
});

const validate = (req, res, next) => {
  console.log(postValidationSchema);
  const { error } = postValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  // throw Boom.badData('Empty value not allowed');
  next();
};

exports.validate = validate;
