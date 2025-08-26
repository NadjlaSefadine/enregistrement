const express = require("express");

const {
  register,
  login,
  verify,
  deleteUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.patch("/verify-email", verify);
router.post("/login", login);
router.delete("/delete", authMiddleware, deleteUser);
// Routes de mot de passe
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);

module.exports = router;