const BadRequestError = require("../errors/BadRequestError");
const clothingItem = require("../models/clothingItem");
const {
  SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN_REQUEST,
} = require("../utils/errors");

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

const addClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const { _id } = req.user;
  clothingItem
    .create({ name, weather, imageUrl, owner: _id })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError());

        //return BAD_REQUEST(err, res);
      }
      //return SERVER_ERROR(err, res);
      return next(err);
    });
};

const deleteClothingItem = (req, res) => {
  const { id } = req.params;

  clothingItem
    .findById(id)
    .orFail()
    .then((item) => {
      if (item.owner.toString() === req.user._id.toString()) {
        clothingItem
          .findByIdAndDelete(id)
          .orFail()
          .then((data) => res.status(200).send(data))
          .catch((err) => {
            if (err.name === "DocumentNotFoundError") {
              return NOT_FOUND(err, res);
            }
            if (err.name === "CastError") {
              return BAD_REQUEST(err, res);
            }
            if (err.name === "InsufficientPermissions") {
              return FORBIDDEN_REQUEST(
                {
                  message:
                    "You cannot delete another users item without admin permissions",
                },
                res
              );
            }
            return SERVER_ERROR(err, res);
          });
      }
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return NOT_FOUND(err, res);
      }
      if (err.name === "CastError") {
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
