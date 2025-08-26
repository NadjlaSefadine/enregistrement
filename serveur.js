require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productsRouter = require("./routers/productRouter");

const userRouter = require("./routers/userRouter");
const { set } = require("./utils/mailTransporter");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connexion réussie à la base de données!");
  })
  .catch((error) => {
    console.error(error);
  });
// Middleware to handle any json payload data sent from a client
app.use(express.json());

// Router
app.use("/products", productsRouter);
app.use("/users", userRouter);
// app.use("/test", (req, res, next) => {
//   console.log(req.method);
// next();
// })
app.get("/test", authMiddleware,
  (req, res) => {
    res.send({message: "message"});
  }
)

// Expose the server on the defined port
app.listen(PORT, () => {
  console.log(`Serveur écoute sur le port ${PORT}`);
});