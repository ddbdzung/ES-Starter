const Joi = require('joi')
const httpStatus = require('http-status')

const pick = require('../helpers/pick.js')
const ApiError = require('../helpers/ApiError.js')

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body'])

  const object = pick(req, Object.keys(validSchema))

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object)

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ')
    if (process.env?.NODE_ENV === 'development') console.log(errorMessage)

    return next(new ApiError(httpStatus.BAD_REQUEST, httpStatus[400]))
  }
  Object.assign(req, value)
  return next()
}

module.exports = validate
