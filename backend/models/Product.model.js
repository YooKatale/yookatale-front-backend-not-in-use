import { Schema, model } from "mongoose";

const productSchema = Schema(
  {
    name: String,
    category: String,
    description: String,
    subCategory: Array,
    images: Array,
    price: Number,
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

export default Product;
