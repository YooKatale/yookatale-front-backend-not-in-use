import { addDays } from "date-fns";
import { verifyTransaction } from "../custom/Custom.js";
import Cart from "../models/Cart.model.js";
import Order from "../models/Order.model.js";
import Schedule from "../models/Schedule.model.js";
import Subscription from "../models/Subscription.model.js";
import { TryCatch, resendEmail } from "../utils/utils.js";

export const updateOrderPut = TryCatch(async (req, res) => {
  const { data } = req.body;

  if (!data || data == "" || data == {})
    throw new Error("Unexpected error please try again");

  // verify flutterwave payment
  if (
    (await verifyTransaction(data.payment.transactionTxRef.toString())) ==
    "error"
  )
    throw new Error("Transaction not found");

  // fetch order and update status and payment
  const order = await Order.findOneAndUpdate(
    { _id: data?.order },
    { status: "completed" },
    { payment: data.payment }
  );

  let orderFor = "";

  // fetch schema to update status
  switch (order?.paymentFor) {
    case "schedule":
      await Schedule.findOneAndUpdate(
        { orderId: data?.order },
        { status: "approved" }
      );

      orderFor = "Delivery Schedule";
      break;

    case "cart":
      orderFor = "Products";
      break;

    case "subscription":
      await Subscription.findOneAndUpdate(
        { orderId: order._id },
        { status: "active" },
        { expiresOn: addDays(new Date(), 30) }
      );

      orderFor = "Subscription";
      break;

    default:
      break;
  }

  // send user email
  const response = await resendEmail({
    template: "order",
    to: "pujeremy27@gmail.com",
    from: "info@yookatale.com",
    subject: "Order Successful",
    orderID: order._id,
    orderTotal: order.total,
    orderFor,
    deliveryAddress: {
      address1: order.deliveryAddress?.address1,
      address2: order.deliveryAddress?.address2,
    },
  });

  res.status(200).json({ status: "Success" });
});
