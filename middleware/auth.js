const jwt = require("jsonwebtoken");

const UnauthorizedError = require("../errors/UnauthorizedError");

const JWT_SECRET = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(new UnauthorizedError("Not authorized"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Not authorized"));
  }

  req.user = payload;

  return next();
};
