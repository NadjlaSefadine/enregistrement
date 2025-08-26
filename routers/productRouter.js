const express = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getSingleProduct);
router.post("/", authMiddleware, productController.addProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;