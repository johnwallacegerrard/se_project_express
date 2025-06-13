const router = require("express").Router();

const NotFoundError = require("../errors/NotFoundError");

const userRouter = require("./users");

const clothingItemRouter = require("./clothingItems");

router.use("/", userRouter);
router.use("/items", clothingItemRouter);
router.use((req, res) => next(new NotFoundError("Not found")));

module.exports = router;
