const productModel = require("..//models/productModel");

// Get all products
const getProducts = async (req, res) => {
  const products = await Model.find();

  res.send({
    products,
  });
};

// Get a single product by its ID
const getSingleProduct = async (req, res) => {
  const id = req.params.id;

  const product = await productModel.findById(id); // .find({_id: sproductId})

  if (!product) {
    res.status(404).send({
      message: "Product not found.",
    });
    return;
  }

  res.send({ product });
};

// Add a new products
const addProduct = async (req, res) => {
  const product = req.body;
  //   console.log(product);

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

// Update a product
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

// Delete a product
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

module.exports = {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deletedeProduct,
};
