const router = require("express").Router();

const auth = require("../middleware/auth");

const {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

const { validateCardBody, validateId } = require("../middleware/validation");

router.get("/", getClothingItems);

router.use(auth);

router.post("/", validateCardBody, addClothingItem);
router.delete("/:id", validateId, deleteClothingItem);
router.put("/:id/likes", validateId, likeItem);
router.delete("/:id/likes", validateId, unlikeItem);

module.exports = router;
