const router = require("express").Router();
const {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", addClothingItem);
router.delete("/:id", deleteClothingItem);
router.put("/:id/likes", likeItem); // req.params = {id: 1fj82j8f3j928f3j}
router.delete("/:id/likes", unlikeItem);

module.exports = router;
