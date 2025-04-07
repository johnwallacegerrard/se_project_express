const user = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const getUsers = (req, res) => {
  user
    .find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error(err);
      return SERVER_ERROR(err, res);
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  console.log("name", name);
  user
    .create({ name, avatar })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return BAD_REQUEST(err, res);
      }
      return SERVER_ERROR(err, res);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  user
    .findById(userId)
    .orFail()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return NOT_FOUND(err, res);
      }
      return SERVER_ERROR(err, res);
    });
};

module.exports = { getUsers, createUser, getUser };
