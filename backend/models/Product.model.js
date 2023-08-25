import { Schema, model } from "mongoose";

const priceTierSchema = new Schema({
  quantity: String,
  price: Number,
});

const productSchema = Schema(
  {
    name: String,
    category: String,
    description: String,
    subCategory: String,
    images: Array,
    price: Number,
    priceTiers: [priceTierSchema],
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

export default Product;
