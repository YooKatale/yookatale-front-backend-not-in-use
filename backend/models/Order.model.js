import { Schema, model } from "mongoose";

const orderSchema = Schema(
  {
    user: String,
    products: Array,
    total: Number,
    productItems: String,
    payment: Object,
    deliveryAddress: Object,
    specialRequest: Object,
    status: String,
    trackingInfo: [
      {
        status: String,
        timestamp: Date,
      },
    ],
  },
  { timestamps: true }
);

const Order = model("order", orderSchema);

export default Order;
