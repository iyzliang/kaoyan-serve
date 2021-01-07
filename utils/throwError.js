const ErrorCode = {
  'param': 'ParamCheckError',
  'bad': 'BadError'
}

function ThrowError (code, error) {
  this.name = 'KYAppError'
  this.message = error.message
  Error.call(this, error.message)
  Error.captureStackTrace(this, this.constructor)
  this.code = code
  this.status = error.status
  this.inner = error
}

ThrowError.prototype = Object.create(Error.prototype)
ThrowError.prototype.constructor = ThrowError

module.exports = {
  ErrorCode,
  ThrowError
}
