import validator from "validator";
import User from "../models/User.model.js";
import {
  TryCatch,
  fetchImageUrl,
  generateToken,
  resendEmail,
  sanitizePhoneNumber,
  sendEmail,
} from "../utils/utils.js";
import Product from "../models/Product.model.js";
import Cart from "../models/Cart.model.js";
import { calcCartTotal, createFilterObjects } from "../custom/Custom.js";
import Order from "../models/Order.model.js";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uniqueString } from "uuid";
import Comment from "../models/Comments.model.js";
import SubscriptionCard from "../models/SubscriptionCard.model.js";
import Flutterwave from "flutterwave-node-v3";
import Subscription from "../models/Subscription.model.js";
import { addDays } from "date-fns";

dotenv.config();

// env letiables
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;
const jwtSign = process.env.JWT_SECRET_SIGN;
const env = process.env.NODE_ENV;

// const flwPublicKey = process.env.FLW_PUBLIC_KEY;
// const flwSecretKey = process.env.FLW_SECRET_KEY;

// const FLW = new Flutterwave(flwPublicKey, flwSecretKey);

const S3 = new S3Client({
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
  region: bucketRegion,
});

// public route to sign in
export const authUserPost = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new Error("User account not found");

  if (!(await user.matchPasswords(password))) throw new Error("Wrong password");

  generateToken(res, user._id);

  res.status(200).json({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    gender: user.gender,
    vegan: user.vegan,
    phone: user.phone,
    expires: addDays(new Date(), 3),
  });
});

// public route to sign up user
export const registerUserPost = TryCatch(async (req, res) => {
  const { firstname, lastname, email, phone, gender, vegan, password } =
    req.body;

  if (!firstname || firstname == "") throw new Error("Firstname is required");
  if (!lastname || lastname == "") throw new Error("Lastname is required");
  if (!email || email == "") throw new Error("Email is required");
  if (!phone || phone == "") throw new Error("Phone number is required");
  if (!gender || gender == "") throw new Error("Gender is required");
  if (!password || password == "") throw new Error("Password is required");
  if (!validator.isEmail(email)) throw new Error("Email is invalid");

  const findUser = await User.findOne({ email });

  if (findUser) throw new Error("Account already exists");

  const user = await User.create({
    firstname,
    lastname,
    email,
    gender,
    vegan,
    phone,
    password,
  });

  generateToken(res, user._id);

  const response = await resendEmail({
    template: "welcome",
    name: user.firstname,
  });

  res.status(200).json({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    gender: user.gender,
    vegan: user.vegan,
    phone: user.phone,
    expires: addDays(new Date(), 3),
  });
});

// public route to logout user and remove token
export const logoutUserPost = TryCatch(async (req, res) => {
  res.cookie("jwtYookatale", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out" });
});

// private route to create new products
export const createNewProductPost = TryCatch(async (req, res) => {
  const { name, category, description, subCategory, price } = req.body;

  if (!name || name == "") throw new Error("Product name is required");
  if (!category || category == "")
    throw new Error("Product category is required");
  if (!description || description == "")
    throw new Error("Product description is required");
  if (!price || price == "") throw new Error("Product price is required");

  // uploading of images would ideally go here
  let images = [];

  if (env === "production") {
    for (const image of req.files) {
      const imageName = uniqueString();
      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: image.buffer,
        ContentType: image.mimetype,
      };
      const putCommand = new PutObjectCommand(params);

      await S3.send(putCommand);

      images.push(imageName);
    }
  } else {
    images = req.files.map((file) => file.filename);
  }

  const newProduct = new Product({
    name,
    category,
    description,
    subCategory,
    images,
    price,
  });

  await newProduct.save();

  res.status(200).json({ status: "Success" });
});

// public function to fetch all products
export const fetchProductsGet = TryCatch(async (req, res) => {
  const Products = await Product.find();

  if (env === "production") {
    for (const product of Products) {
      product.images = await fetchImageUrl(product.images[0]);
    }
  }

  res.status(200).json({ status: "Success", data: Products });
});

// public function to fetch a product
export const fetchProductGet = TryCatch(async (req, res) => {
  const data = req.params.data;

  const ProductFetch = await Product.findOne({ _id: data });

  if (env === "production") {
    let loopCount = 0;
    for (const image of ProductFetch.images) {
      ProductFetch.images[loopCount] = await fetchImageUrl(image);
      loopCount++;
    }
  }

  res.status(200).json({ status: "Success", data: ProductFetch });
});

// public function to fetch all products
export const fetchProductsCategoryGet = TryCatch(async (req, res) => {
  // categories passed shall be an array
  const data = req.params.data ? JSON.parse(req.params.data) : [];

  // loop through the categories passed and fetch products for each category and store them in the ProductsCategory object
  let ProductsCategory = [];

  for (const param of data) {
    let productsFetched = await Product.find({ category: param });

    // check if products were found in category attribute, if not check in the subCategory attribute
    if (!productsFetched || productsFetched.length < 1) {
      productsFetched = await Product.find({ subCategory: param });
    }

    if (env === "production") {
      for (const product of productsFetched) {
        product.images = await fetchImageUrl(product.images[0]);
      }
    }

    ProductsCategory.push({ [param]: productsFetched });
  }

  res.status(200).json({ status: "Success", data: ProductsCategory });
});

// public function to fetch filterd products
export const fetchProductsFilterGet = TryCatch(async (req, res) => {
  const data = req.params.data ? JSON.parse(req.params.data) : [];

  // check if filter params have been passed. If no return all Products in the database
  if (data?.length === 0) {
    let Products = Product.find();

    if (env === "production") {
      for (const product of Products) {
        product.images = await fetchImageUrl(product.images[0]);
      }
    }

    return res.status(200).json({
      status: "Success",
      data: { Products, title: "All Products" },
    });
  }

  // check if highest and or lowest have been passed along with other filter params. If no return all products filtered by lowest or highest

  // logic - if highest has been passed and there is another filter parameter in the array, if the other parameter is lowest then just return all products filtered by highest price else continue to fetch filtered list of products. Same logic for the lowest

  if (data.findIndex((item) => item === "highest") >= 0) {
    if (data.length > 1) {
      if (
        data.findIndex((item) => item === "lowest") >= 0 &&
        data.length <= 2
      ) {
        let HighestProducts = await Product.find();

        HighestProducts = HighestProducts.sort((a, b) => b.price - a.price);

        if (env === "production") {
          for (const product of HighestProducts) {
            product.images = await fetchImageUrl(product.images[0]);
          }
        }

        return res
          .status(200)
          .json({ status: "Success", data: HighestProducts });
      }

      let Products = await Product.find({
        $or: createFilterObjects(data),
      });

      Products = Products.sort((a, b) => b.price - a.price);

      if (env === "production") {
        for (const product of Products) {
          product.images = await fetchImageUrl(product.images[0]);
        }
      }

      return res.status(200).json({ status: "Success", data: Products });
    } else {
      let HighestProducts = await Product.find();
      HighestProducts = HighestProducts.sort((a, b) => b.price - a.price);

      if (env === "production") {
        for (const product of HighestProducts) {
          product.images = await fetchImageUrl(product.images[0]);
        }
      }

      return res.status(200).json({ status: "Success", data: HighestProducts });
    }
  }

  if (data.findIndex((item) => item === "lowest") >= 0) {
    if (data.length > 1) {
      if (
        data.findIndex((item) => item === "highest") >= 0 &&
        data.length <= 2
      ) {
        let LowestProducts = await Product.find();
        LowestProducts = LowestProducts.sort((a, b) => a.price - b.price);

        if (env === "production") {
          for (const product of LowestProducts) {
            product.images = await fetchImageUrl(product.images[0]);
          }
        }

        return res
          .status(200)
          .json({ status: "Success", data: LowestProducts });
      }

      let Products = await Product.find({
        $or: createFilterObjects(data),
      });

      Products = Products.sort((a, b) => a.price - b.price);

      if (env === "production") {
        for (const product of Products) {
          product.images = await fetchImageUrl(product.images[0]);
        }
      }

      return res.status(200).json({ status: "Success", data: Products });
    } else {
      let LowestProducts = await Product.find();
      LowestProducts = LowestProducts.sort((a, b) => a.price - b.price);

      if (env === "production") {
        for (const product of LowestProducts) {
          product.images = await fetchImageUrl(product.images[0]);
        }
      }

      return res.status(200).json({ status: "Success", data: LowestProducts });
    }
  }

  // fetch products by filter values
  let Products = await Product.find({
    $or: createFilterObjects(data),
  });

  if (env === "production") {
    for (const product of Products) {
      product.images = await fetchImageUrl(product.images[0]);
    }
  }

  if (Products && Products?.length === 0)
    return res.status(200).json({ status: "Success", data: Products });

  if (data.findIndex((item) => item === "highest") >= 0) {
    Products = Products.sort((a, b) => b.price - a.price);
    return res.status(200).json({ status: "Success", data: Products });
  }

  if (data.findIndex((item) => item === "lowest") >= 0) {
    Products = Products.sort((a, b) => a.price - b.price);
    return res.status(200).json({ status: "Success", data: Products });
  }

  return res.status(200).json({ status: "Success", data: Products });
});

// private controller to fetch users cart
export const fetchCartGet = TryCatch(async (req, res) => {
  const data = req.params.data;

  const CartItems = await Cart.find({ user: data, status: "pending" });
  const CartProductsItems = [];

  // check CartItems length if equal to zero then return a response
  if (CartItems && CartItems.length == 0)
    return res.status(200).json({ status: "Success", data: CartItems });

  // loop through the fetched cart items and fetch the product details for each cart item
  for (let i = 0; i < CartItems.length; i++) {
    // CartItems[i] = { ...CartItems[i], product: CartProduct };
    CartProductsItems.push(
      await Product.findOne({ _id: CartItems[i].productId })
    );
  }

  if (env === "production") {
    for (const product of CartProductsItems) {
      product.images = await fetchImageUrl(product.images[0]);
    }
  }

  res
    .status(200)
    .json({ status: "Success", data: { CartItems, CartProductsItems } });
});

// private controller to add item to cart
export const createCartPost = TryCatch(async (req, res) => {
  const { productId, userId } = req.body;

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

  const NewCart = new Cart({ productId, user: userId });

  await NewCart.save();

  const CartProduct = await Product.findOne({ _id: productId });

  res
    .status(200)
    .json({ status: "Success", message: `${CartProduct.name} added to cart` });
});

// private controller to delete item from cart
export const deleteCart = TryCatch(async (req, res) => {
  const data = req.params.data;

  const cart = await Cart.findOneAndRemove({ _id: data });

  if (!cart) throw Error("Operation failed");

  res.status(200).json({ status: "Success" });
});

// public function to retrieve search params
export const productSearchGet = TryCatch(async (req, res) => {
  const data = req.params.data;

  const ProductsFetch = await Product.find();

  if (env === "production") {
    for (const product of ProductsFetch) {
      product.images = await fetchImageUrl(product.images[0]);
    }
  }

  const Products = [];

  ProductsFetch.forEach((product) => {
    if (
      product.name
        .toString()
        .toLowerCase()
        .indexOf(data.toString().toLowerCase()) > -1
    ) {
      Products.push(product);
    }
  });

  res.status(200).json({ status: "Success", Products });
});

// public function to save orders
export const createNewOrderPost = TryCatch(async (req, res) => {
  const { Carts, Orders, payment, personalInfo } = req.body;

  console.log(req.body);

  if (!Carts || Carts == "" || Carts == {})
    throw new Error("Unexpected error occured");

  if (!Orders || Orders == "" || Orders == {})
    throw new Error("Unexpected error occured");

  if (!personalInfo || personalInfo == "" || personalInfo == {})
    throw new Error("Unexpected error occured");

  if (!payment || payment == "" || payment == {})
    throw new Error("Unexpected error occured");

  const Products = [];

  if (Carts?.length) {
    for (const cart of Carts) {
      Products.push({
        id: cart?._id,
        name: cart?.name,
        quantity: cart?.quantity,
        image: cart?.images[0],
        price: cart?.price,
      });
    }
  }

  const NewOrder = new Order({
    user: personalInfo?._id,
    products: Products,
    total: await calcCartTotal(Carts),
    productItems: `${Carts?.length} items`,
    payment,
    deliveryAddress: Orders?.deliveryAddress,
    specialRequest: Orders?.specialRequest,
    status: payment?.paymentMethod == "cash" ? "pending" : "payed",
  });

  await NewOrder.save();

  for (const cart of Carts) {
    await Cart.findOneAndUpdate({ _id: cart.cartId }, { status: "checkedout" });
  }

  const response = await resendEmail({
    template: "order",
    email: personalInfo?.email,
    subject: "Order Successful",
    orderID: NewOrder?._id,
    orderTotal: NewOrder?.total,
    orderFor: `Food stufss`,
    deliveryAddress: {
      address1: Orders.deliveryAddress?.address1,
      address2: Orders.deliveryAddress?.address2,
    },
  });

  if (response === "success") {
    res.status(200).json({ status: "Success" });
  }
});

// private function to fetch orders
export const fetchOrdersGet = TryCatch(async (req, res) => {
  const param = req.params.data;

  if (!param || param == undefined) throw new Error("Unexpected error");

  const CompletedOrders = await Order.find({
    user: param,
    status: "completed",
  });

  const AllOrders = await Order.find({ user: param });

  res
    .status(200)
    .json({ status: "Success", data: { CompletedOrders, AllOrders } });
});

// public function to add comments
export const fetchCommentsGet = TryCatch(async (req, res) => {
  const Comments = await Comment.find();

  res.status(200).json({ status: "Success", data: Comments });
});
// public function to fetch comments
// public function to create subscription cards
export const createSubscriptionCard = TryCatch(async (req, res) => {
  const { type, price, name, renewed, details, previousPrice } = req.body;

  const NewSubscriptionCard = new SubscriptionCard({
    type,
    price,
    name,
    renewed,
    details,
    previousPrice,
  });

  await NewSubscriptionCard.save();

  res.status(200).json({ status: "Success" });
});

// public function to fetch subscription card plans
export const fetchSubscriptionCards = TryCatch(async (req, res) => {
  const Cards = await SubscriptionCard.find();

  res.status(200).json({ status: "Success", data: Cards });
});

// public function to create subscription
export const createSubscriptionPost = TryCatch(async (req, res) => {
  const { data } = req.body;

  if (!data) throw new Error("Unexpected error occured. Please try again");

  // if user has purchased only one card
  if (data?.quantity == 1) {
    let NewCardNo = new Array(14)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10).toString())
      .join("");

    const NewSubscription = new Subscription({
      userId: data?.personalInfo?._id ? data?.personalInfo?._id : "",
      user: {
        firstname: data?.personalInfo?.firstname,
        lastname: data?.personalInfo?.lastname,
        email: data?.personalInfo?.email,
        phone: data?.personalInfo?.phone,
        gender: data?.personalInfo?.gender,
      },
      cards: [
        {
          cardNumber: NewCardNo,
          card: data?.selectedSubscriptionCard?._id,
        },
      ],
      status: "active",
      expiresOn: addDays(new Date(), 30),
    });

    await NewSubscription.save();

    const NewOrder = await Order.create({
      user: data?.personalInfo?._id
        ? data?.personalInfo?._id
        : `${data?.personalInfo?.firstname} ${data?.personalInfo?.lastname}`,
      products: [
        {
          id: data?.selectedSubscriptionCard?._id,
          name: `YooCard ${data?.selectedSubscriptionCard?.type}`,
        },
      ],
      total: data?.total,
      productItems: data?.quantity,
      paymentMethod: data?.paymentMethod,
      deliveryAddress: data?.deliveryAddress,
      specialRequest: {},
      status: "pending",
    });

    const response = await resendEmail({
      template: "order",
      email: data?.personalInfo?.email,
      subject: "Order Successful",
      orderID: NewOrder?._id,
      orderTotal: NewOrder?.total,
      orderFor: `YooCard ${data?.selectedSubscriptionCard?.type}`,
      deliveryAddress: {
        address1: data?.deliveryAddress?.address1,
        address2: data?.deliveryAddress?.address2,
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
  for (let i = 0; i < parseInt(data?.quantity); i++) {
    let NewCardNo = new Array(14)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10).toString())
      .join("");

    const NewSubscription = new Subscription({
      userId: data?.personalInfo?._id ? data?.personalInfo?._id : "",
      user: {
        firstname: data?.personalInfo?.firstname,
        lastname: data?.personalInfo?.lastname,
        email: data?.personalInfo?.email,
        phone: data?.personalInfo?.phone,
        gender: data?.personalInfo?.gender,
      },
      cards: [
        {
          cardNumber: NewCardNo,
          card: data?.selectedSubscriptionCard?._id,
        },
      ],
      status: "active",
      expiresOn: addDays(new Date(), 30),
    });

    await NewSubscription.save();
  }

  const NewOrder = await Order.create({
    user: data?.personalInfo?._id
      ? data?.personalInfo?._id
      : `${data?.personalInfo?.firstname} ${data?.personalInfo?.lastname}`,
    products: [
      {
        id: data?.selectedSubscriptionCard?._id,
        name: `YooCard ${data?.selectedSubscriptionCard?.type}`,
      },
    ],
    total: data?.total,
    productItems: data?.quantity,
    paymentMethod: data?.paymentMethod,
    deliveryAddress: data?.deliveryAddress,
    specialRequest: {},
    status: "pending",
  });

  const response = await resendEmail({
    template: "order",
    email: data?.personalInfo?.email,
    subject: "Order Successful",
    orderID: NewOrder?._id,
    orderTotal: NewOrder?.total,
    orderFor: `YooCard ${data?.selectedSubscriptionCard?.type}`,
    deliveryAddress: {
      address1: data?.deliveryAddress?.address1,
      address2: data?.deliveryAddress?.address2,
    },
  });

  if (response === "success") {
    res.status(200).json({
      status: "Success",
      data: { message: "Order successfully placed" },
    });
  }
});

export const testEmailFeature = TryCatch(async (req, res) => {
  const { message } = req.body;

  const response = await resendEmail();

  // console.log({ response });

  res.status(200).json({ response });
});

// export const paymentWebhookGet = TryCatch(async (req, res) => {
//   console.log(req);
// });
