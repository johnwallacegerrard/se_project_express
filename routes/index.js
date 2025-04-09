const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use((req, res) => {
  if (res.status === 200) {
    return res.send(req.body);
  }
  if (res.status === 404) {
    return res.send({ message: "route not found" });
  }
});

module.exports = router;
