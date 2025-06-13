const clothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

const getClothingItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      return next(err);
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
      // console.error(err);
      if (err.name === "ValidationError" || err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }

      return next(err);
    });
};

const deleteClothingItem = (req, res, next) => {
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
              return next(new NotFoundError("Not found"));
            }
            if (err.name === "CastError") {
              return next(new BadRequestError("Invalid data"));
            }
            if (err.name === "InsufficientPermissions") {
              return next(
                new ForbiddenError("You cannot delete another users item")
              );
            }
            return next(err);
          });
      } else {
        return next(
          new ForbiddenError("You cannot deleter another users item")
        );
      }
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError());
      }
      if (err.name === "CastError") {
        return next(new BadRequestError());
      }
      return next(err);
    });
};

const likeItem = (req, res, next) => {
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
        return next(new NotFoundError());
      }
      return next(err);
    });
};

const unlikeItem = (req, res, next) => {
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
        return next(new NotFoundError());
      }
      return next(err);
    });
};

module.exports = {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,
};
