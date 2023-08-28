import { Schema, model } from "mongoose";

const productSchema = Schema(
  {
    name: String,
    category: String,
    description: String,
    subCategory: String,
    images: Array,
    price: Number,
    unit: String
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

export default Product;
