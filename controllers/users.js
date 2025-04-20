const user = require("../models/user");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const {
  DUPLICATE_EMAIL,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED_REQUEST,
} = require("../utils/errors");
const JWT_SECRET = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      user.create({ name, avatar, email: req.body.email, password: hash })
    )

    .then((data) => {
      const userData = data.toObject();
      delete userData.password;
      res.status(201).send(userData);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return BAD_REQUEST(err, res);
      }
      if (err.code === 11000) {
        return DUPLICATE_EMAIL(err, res);
      }
      return SERVER_ERROR(err, res);
    });
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;
  user
    .findById(_id)
    .orFail()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return BAD_REQUEST(err, res);
      }
      if (err.name === "DocumentNotFoundError") {
        return NOT_FOUND(err, res);
      }
      return SERVER_ERROR(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return BAD_REQUEST({ message: "Email and password are required" }, res);
  }

  return user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return UNAUTHORIZED_REQUEST(err, res);
      }
      return SERVER_ERROR(err, res);
    });
};

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;
  user
    .findByIdAndUpdate(
      _id,
      {
        $set: {
          name: name,
          avatar: avatar,
        },
      },
      { new: true, runValidators: true }
    )
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return BAD_REQUEST(err, res);
      }
      if (err.name === "CastError" || err.name === "DocumentNotFoundError") {
        return NOT_FOUND(err, res);
      }
      return SERVER_ERROR(err, res);
    });
};

module.exports = { getCurrentUser, createUser, login, updateProfile };
