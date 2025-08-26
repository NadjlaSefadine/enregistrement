const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.patch("/verify", userController.verify);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.patch("/reset-password", userController.resetPassword);

module.exports = router;
