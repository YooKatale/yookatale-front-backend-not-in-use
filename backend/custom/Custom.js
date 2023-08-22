import Order from "../models/Order.model.js";
import Flutterwave from "flutterwave-node-v3";

const flwPublicKey = process.env.FLW_PUBLIC_KEY;
const flwSecretKey = process.env.FLW_SECRET_KEY;

export const createFilterObjects = (filterArray) => {
  let arr = [];

  for (const obj of filterArray) {
    arr.push({ category: `${obj}` });
  }

  return arr;
};

export const calcCartTotal = (Cart) => {
  let total = 0;

  total = Cart.reduce((a, b) => {
    return a + parseInt(b?.total ? b?.total : 0);
  }, 0);

  return total;
};

export const sumCartQuantity = (Cart) => {
  if (!Cart || !Cart.length || Cart.length < 1) return false;

  let total = parseInt(Cart.length);

  total += Cart.reduce((a, b) => a + parseInt(b?.quantity), 0);

  return total;
};

// function to create new order
export const createOrder = async (data) => {
  const NewOrder = new Order({
    user: data.user._id,
    products: data.Products,
    total: data.orderTotal,
    productItems: `${data.items} items`,
    payment: data?.payment,
    deliveryAddress: data?.deliveryAddress,
    specialRequest: data?.specialRequest,
    status:
      data?.payment?.paymentMethod == ""
        ? ""
        : data?.payment?.paymentMethod == "cash"
        ? "pending"
        : "confirmed",
  });

  NewOrder.save();

  return NewOrder._id;
};

// function to verify transactions
export const verifyTransaction = async (data) => {
  const flw = new Flutterwave(flwPublicKey, flwSecretKey);

  const payload = { id: data };

  const response = await flw.Transaction.verify(payload);

  return response.status;
};
