import { Schema, model } from "mongoose";

const orderSchema = Schema(
  {
    user: String,
    products: Array,
    total: Number,
    productItems: String,
    paymentMethod: String,
    deliveryAddress: Object,
    specialRequest: Object,
    status: String,
  },
  { timestamps: true }
);

const Order = model("order", orderSchema);

export default Order;
