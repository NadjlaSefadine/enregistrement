const express = require("express");
const {register, login, verify} = require("../controllers/userControoler");
const router = express.Router();

// create un router aui permet d'ajouter un user
router.post("/", register);
router.post("/verify-email", verify);
router.post("/login", login);


module.exports = router;
