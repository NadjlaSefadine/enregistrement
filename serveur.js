require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

<<<<<<< HEAD
const studentRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");

const app = express();
const PORT = process.env.PORT;
=======
// const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");

const app = express();
const PORT = process.env.PORT || 5000;
>>>>>>> a1867ab (voici les ficher utils)

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

<<<<<<< HEAD
app.use("/students", studentRouter);
=======
// app.use("/products", productRouter);
>>>>>>> a1867ab (voici les ficher utils)
app.use("/users", userRouter);

// Expose the server on the defined port
app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`Server listening on port ${PORT}`);
});
=======
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> a1867ab (voici les ficher utils)
