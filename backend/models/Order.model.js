import { Schema, model } from "mongoose";

const orderSchema = Schema(
  {
    user: String,
    products: Array,
    total: Number,
    productItems: String,
    payment: Object,
    paymentFor: String,
    deliveryAddress: Object,
    specialRequest: Object,
    status: String,
  },
  { timestamps: true }
);

const Order = model("order", orderSchema);

export default Order;
