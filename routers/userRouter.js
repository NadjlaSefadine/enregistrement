const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/verify", userController.verify);
router.post("/login", userController.login);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/resetPassword", userController.resetPassword);

module.exports = router;
