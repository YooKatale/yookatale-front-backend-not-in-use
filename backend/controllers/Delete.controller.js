import Cart from "../models/Cart.model.js";
import { TryCatch } from "../utils/utils.js";

// private controller to delete item from cart
export const deleteCart = TryCatch(async (req, res) => {
  const data = req.params.data;

  const cart = await Cart.findOneAndRemove({ _id: data });

  if (!cart) throw Error("Operation failed");

  res.status(200).json({ status: "Success" });
});
