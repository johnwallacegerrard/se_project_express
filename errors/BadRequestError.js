class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this._statusCode = 400;
  }
}

module.exports = BadRequestError;


