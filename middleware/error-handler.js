const errorHandler = (err, req, res, next) => {
  console.error(err);
  const { _statusCode = 500, message } = err;
  res.status(_statusCode).send({
    message: _statusCode === 500 ? "An error occurred on the server" : message,
  });
};

module.exports = errorHandler;
