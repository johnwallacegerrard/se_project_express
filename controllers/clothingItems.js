const clothingItem = require("../models/clothingItem");
const { SERVER_ERROR, BAD_REQUEST, NOT_FOUND } = require("../utils/errors");

const getClothingItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      return SERVER_ERROR(err, res);
    });
};

const addClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const { _id } = req.user._id;
  clothingItem
    .create({ name, weather, imageUrl, owner: _id })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return BAD_REQUEST(err, res);
      }
      return SERVER_ERROR(err, res);
    });
};

const deleteClothingItem = (req, res) => {
  const { id } = req.params;
  clothingItem
    .findByIdAndDelete(id)
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return NOT_FOUND(err, res);
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return BAD_REQUEST(err, res);
      }
      return SERVER_ERROR(err, res);
    });
};

const likeItem = (req, res) => {
  const { id } = req.params;
  clothingItem
    .findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return NOT_FOUND(err, res);
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return BAD_REQUEST(err, res);
      }
      return SERVER_ERROR(err, res);
    });
};

const unlikeItem = (req, res) => {
  const { id } = req.params;
  clothingItem
    .findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return NOT_FOUND(err, res);
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return BAD_REQUEST(err, res);
      }
      return SERVER_ERROR(err, res);
    });
};

module.exports = {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,
};
