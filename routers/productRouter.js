const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getSingleProduct);
router.post("/", productController.addProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deletedeProduct);

module.exports = router;
