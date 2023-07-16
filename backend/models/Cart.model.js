import { Schema, model } from "mongoose";

const cartSchema = Schema(
  {
    productId: Schema.Types.ObjectId,
    user: String,
    quantity: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

export default Cart;
