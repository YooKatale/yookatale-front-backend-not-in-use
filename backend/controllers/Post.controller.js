import { calcCartTotal, createOrder } from "../custom/Custom.js";
import Cart from "../models/Cart.model.js";
import Comment from "../models/Comments.model.js";
import Newsletter from "../models/Newsletter.model.js";
import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";
import Schedule from "../models/Schedule.model.js";
import Subscription from "../models/Subscription.model.js";
import { TryCatch, resendEmail } from "../utils/utils.js";
import validator from "validator";

// private controller to add item to cart
export const createCartPost = TryCatch(async (req, res) => {
  const { productId, userId, quantity } = req.body;

  if (!productId || productId == "")
    throw new Error("Unexpected error has occured");
  if (!userId || userId == "") throw new Error("Unexpected error has occured");

  // check if product has already been added to cart
  const CartFetch = await Cart.findOne({
    productId,
    user: userId,
    status: "pending",
  });

  if (CartFetch) throw new Error("Product already added to cart");

  const NewCart = new Cart({ productId, user: userId, quantity });

  await NewCart.save();

  const CartProduct = await Product.findOne({ _id: productId });

  res
    .status(200)
    .json({ status: "Success", message: `${CartProduct.name} added to cart` });
});

export const createCartCheckoutPost = TryCatch(async (req, res) => {
  const { user, Carts, order } = req.body;

  let Products = [];

  // for cart orders
  for (const cart of Carts) {
    Products.push({
      id: cart?._id,
      name: cart?.name,
      quantity: cart?.quantity,
      image: cart?.images[0],
      price: cart?.price,
    });
  }

  for (const cart of Carts) {
    await Cart.findOneAndUpdate({ _id: cart.cartId }, { status: "checkedout" });
  }

  const orderId = await createOrder({
    user,
    Products,
    items: Carts.length,
    ...order,
  });

  res.status(200).json({ status: "Success", data: { Order: orderId } });
});

// private function to create a new schedule delivery
export const createScheduleDeliveryPost = TryCatch(async (req, res) => {
  const { user, products, deliveryDays, deliveryTime, repeatSchedule, order } =
    req.body;

  const Products = [];

  for (const product of products) {
    Products.push({
      id: product?._id,
      name: product?.name,
      quantity: product?.quantity,
      image: product?.images[0],
      price: product?.price,
    });
  }

  const orderId = await createOrder({
    user,
    Products,
    items: Products.length,
    ...order,
  });

  const NewSchedule = new Schedule({
    user: user._id,
    products: Products,
    deliveryDays: deliveryDays,
    deliveryTime: deliveryTime,
    repeatSchedule: repeatSchedule,
    orderId,
    status: "pending",
  });

  await NewSchedule.save();

  res.status(200).json({ status: "Success", data: { Order: orderId } });
});

// private function to add comments
export const createCommentPost = TryCatch(async (req, res) => {
  const { user, comment, newsblogId } = req.body;

  if (!user || user == "") throw Error("User id details is required");
  if (!comment || comment == "") throw Error("Comment is required");
  if (!newsblogId || newsblogId == "") throw Error("Newsblog ID is required");

  const NewComment = new Comment({
    user,
    comment,
    newsblog: newsblogId,
  });

  NewComment.save();

  res.status(200).json({ status: "Success" });
});

// public function to create subscription
export const createSubscriptionPost = TryCatch(async (req, res) => {
  const { data } = req.body;

  if (!data) throw new Error("Unexpected error occured. Please try again");

  // if user has purchased only one card
  if (data?.card?.quantity == 1) {
    let NewCardNo = new Array(14)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10).toString())
      .join("");

    const NewSubscription = new Subscription({
      userId: data?._id ? data?._id : "",
      user: {
        firstname: data?.firstname,
        lastname: data?.lastname,
        email: data?.email,
        phone: data?.phone,
        gender: data?.gender,
      },
      cards: [
        {
          cardNumber: NewCardNo,
          card: data?.selectedCard?.type,
        },
      ],
      status: "pending",
      expiresOn: new Date(),
    });

    await NewSubscription.save();

    const NewOrder = await Order.create({
      user: data?._id ? data?._id : `${data?.firstname} ${data?.lastname}`,
      products: [
        {
          type: data?.selectedCard?.name,
          name: `YooCard ${data?.selectedCard?.type}`,
        },
      ],
      total:
        data?.selectedCard?.price == "Contact for price"
          ? 0
          : parseInt(data?.selectedCard?.price * parseInt(data?.quantity)),
      productItems: data?.quantity,
      payment: {
        paymentMethod: data?.paymentMethod,
        paymentId: data?.paymentId,
      },
      deliveryAddress: { address1: data?.address1, address2: data?.address2 },
      specialRequest: {
        moreInfo: data?.moreInfo,
      },
      status: "pending",
    });

    const response = await resendEmail({
      template: "order",
      from: "info@yookatale.com",
      to: data?.email,
      subject: "Order Successful",
      orderID: NewOrder?._id,
      orderTotal: NewOrder?.total,
      orderFor: `YooCard ${data?.selectedCard?.type}`,
      deliveryAddress: {
        address1: data?.address1,
        address2: data?.address2,
      },
    });

    if (response === "success") {
      res.status(200).json({
        status: "Success",
        data: { message: "Order successfully placed" },
      });
    }

    return;
  }

  // if user has purchased more than one card
  const Cards = [];
  for (let i = 0; i < parseInt(data?.quantity); i++) {
    let NewCardNo = new Array(14)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10).toString())
      .join("");

    Cards.push({
      cardNumber: NewCardNo,
      card: data?.selectedCard?.type,
    });
  }

  const NewSubscription = new Subscription({
    userId: data?._id ? data?._id : "",
    user: {
      firstname: data?.firstname,
      lastname: data?.lastname,
      email: data?.email,
      phone: data?.phone,
      gender: data?.gender,
    },
    cards: Cards,
    status: "pending",
    expiresOn: new Date(),
  });

  await NewSubscription.save();

  const NewOrder = await Order.create({
    user: data?._id ? data?._id : `${data?.firstname} ${data?.lastname}`,
    products: [
      {
        type: data?.selectedCard?.type,
        name: `YooCard ${data?.selectedCard?.type}`,
      },
    ],
    total:
      data?.selectedCard?.price == "Contact for price"
        ? 0
        : parseInt(data?.selectedCard?.price * parseInt(data?.quantity)),
    productItems: data?.quantity,
    payment: { paymentMethod: data?.paymentMethod, paymentId: data?.paymentId },
    deliveryAddress: { address1: data?.address1, address2: data?.address2 },
    specialRequest: { moreInfo: data?.moreInfo },
    status: "pending",
  });

  const response = await resendEmail({
    template: "order",
    from: "info@yookatale.com",
    to: data?.email,
    subject: "Order Successful",
    orderID: NewOrder?._id,
    orderTotal: NewOrder?.total,
    orderFor: `YooCard ${data?.selectedCard?.type}`,
    deliveryAddress: {
      address1: data?.address1,
      address2: data?.address2,
    },
  });

  if (response === "success") {
    res.status(200).json({
      status: "Success",
      data: { message: "Order successfully placed" },
    });
  }
});

export const sendMessagePost = TryCatch(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || name == "") throw new Error("Name is required");
  if (!email || email == "") throw new Error("email is required");
  if (!message || message == "") throw new Error("message is required");

  const response = await resendEmail({
    template: "message",
    email: email,
    to: "yookatale0@gmail.com",
    from: "info@yookatale.com",
    subject: "Support",
    name,
    message,
  });

  if (response == "Error occured") throw new Error("Service offline");

  if (response === "success") {
    res.status(200).json({
      status: "Success",
      data: {
        message: "Message sent. Our team will get back to you shortly",
      },
    });
  }
});

export const createNewsletterPost = TryCatch(async (req, res) => {
  const { email } = req.body;

  if (!email || email == "") throw new Error("Email is required");

  if (!validator.isEmail(email)) throw new Error("Email is invalid");

  // check if email already exists
  const CheckEmail = await Newsletter.findOne({ email });

  if (CheckEmail && CheckEmail?.status == "active") {
    res.status(200).json({ status: "Success" });
    return;
  }

  if (CheckEmail) {
    await Newsletter.findOneAndUpdate({ email }, { status: "active" });

    return;
  }

  const NewNewsletter = new Newsletter({
    email,
    status: "active",
  });

  NewNewsletter.save();

  res.status(200).json({ status: "Success" });
});

// export const paymentWebhookGet = TryCatch(async (req, res) => {
//   console.log(req);
// });