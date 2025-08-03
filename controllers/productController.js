const productModel = require("../models/productModel");

// L'affichage de tous les produits dans la base de données
const getProducts = async (req, res) => {
  const products = await productModel.find();

  res.send({
    products,
  });
};

// L'affichage d'un produit par son id
const getSingleProduct = async (req, res) => {
  const id = req.params.id;

  const product = await productModel.findById(id); 
  

  if (!product) {
    res.status(404).send({
      message: "Product not found.",
    });
    return;
  }

  res.send({ product });
};

// L'ajout d'un nouveau produit
const addProduct = async (req, res) => {
  const product = req.body;

  try {
    await productModel.create(product);
  } catch (error) {
    res.send({
      message: error.message,
    });
    return;
  }

  res.send({
    message: "Product added successfully",
    product,
  });
};

// La mise à jour d'un produit
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;

  const productExists = await productModel.findById(id);

  if (!productExists) {
    res.status(404).send("Product does not exist");
    return;
  }

  const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    {
      name,
      age,
    },
    {
      new: true,
    }
  );

const PORT = process.env.PORT;
  res.send({
    message: "Product updated successfully",
    updatedProduct,
  });
};

// La suppression d'un produit par son id
const deletedeProduct = async (req, res) => {
  const id = req.params.id;

  const deletedeProduct = await productModel.findByIdAndDelete(id);

  if (!deletedeProduct) {
    res.status(401).send({
      message: "Forbidden action",
    });
    return;
  }
  res.send({
    message: "Product deleted successfully",
    deletedeProduct,
  });
};

// exporation de toutes les methodes

module.exports = {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deletedeProduct,
};
