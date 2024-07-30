import Joi from 'joi'

export const joi = Joi.defaults((schema) =>
  schema.options({
    abortEarly: false,
    allowUnknown: true
  })
)
