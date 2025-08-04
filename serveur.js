require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productsRouter = require("./routers/productRouter");

const userRouter = require("./routers/userRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.error(error);
  });

// Middleware to handle any json payload data sent from a client
app.use(express.json());

// Router

app.use("/products", productsRouter);
app.use("/users", userRouter);

// Expose the server on the defined port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});