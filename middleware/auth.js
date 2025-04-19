const jwt = require("jsonwebtoken");

const { UNAUTHORIZED_REQUEST } = require("../utils/errors");
const JWT_SECRET = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return UNAUTHORIZED_REQUEST({ message: "Authorization required" }, res);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return UNAUTHORIZED_REQUEST(err, res);
  }

  req.user = payload;

  next();
};
