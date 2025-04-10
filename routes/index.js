const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use((req, res) => NOT_FOUND(req, res));

module.exports = router;
