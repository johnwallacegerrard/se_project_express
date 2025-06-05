const router = require("express").Router();

const {
  validateSignUpBody,
  validateSignInBody,
} = require("../middleware/validation");

const auth = require("../middleware/auth");

const {
  getCurrentUser,
  createUser,
  login,
  updateProfile,
} = require("../controllers/users");

router.post("/signin", validateSignInBody, login);
router.post("/signup", validateSignUpBody, createUser);

router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, updateProfile);

module.exports = router;
