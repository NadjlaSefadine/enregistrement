require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const productRouter = require("./routers/productRouter");
const userRouter = require ("./routers/userRouter");

const serveur = express();
const port = process.env.port;

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("La connexion est établie avec succès.");
  })
  .catch((error) => {
    console.error(error);
  });

// Middleware to handle any json payload data sent from a client
serveur.use(express.json());

// Routes

serveur.use("/products", productRouter);
serveur.use("/users", userRouter);

// Expose the server on the defined port
serveur.listen(port, () => {
  console.log(`Le serveur est demarré sur le  port ${port}.`);
});
