// Importation de la bibliothèque mongoose
const mongoose = require("mongoose");

// La création de schéma du produit
const ProductSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stockStatus: {
      type: String,
      enum: ["en-stock", "petit-stock", "pas-en-stock"],
      default: "en-stock",
      required: true,
    },
    userId:{
      type:mongoose.Types.ObjectId,
      required:true
    }
  },
  {
    timestamps: true,
  }
);


// On envoie le schéma dans la base de données
const Product = mongoose.model("Product", ProductSchema);

// On exporte le model afin de le rendre disponible dans tout le projet où l'import est.
module.exports = Product;