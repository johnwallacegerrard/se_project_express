const errorHandler = (err, req, res, next) => {
  console.log(err._statusCode);
  const { _statusCode, message } = err;
  res.status(_statusCode).send({
    message: _statusCode === 500 ? "An error occurred on the server" : message,
  });
};

module.exports = errorHandler;
