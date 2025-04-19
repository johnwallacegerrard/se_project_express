const router = require("express").Router();

const auth = require("../middleware/auth");

const {
  getCurrentUser,
  createUser,
  login,
  updateProfile,
} = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, updateProfile);

module.exports = router;
