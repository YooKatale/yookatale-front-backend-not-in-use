import { Schema, model } from "mongoose";

const cartSchema = Schema(
  {
    productId: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
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
