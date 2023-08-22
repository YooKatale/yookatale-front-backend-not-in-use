import envConfig from "../config/env.config.js";
import Cart from "../models/Cart.model.js";
import Comment from "../models/Comments.model.js";
import Newsblog from "../models/Newsblog.model.js";
import Newsletter from "../models/Newsletter.model.js";
import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";
import SubscriptionCard from "../models/SubscriptionCard.model.js";
import User from "../models/User.model.js";
import { TryCatch, fetchImageUrl } from "../utils/utils.js";

// public function to fetch all products
export const fetchProductsGet = TryCatch(async (req, res) => {
  const Products = await Product.find();

  if (envConfig.env === "production") {
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

  if (envConfig.env === "production") {
    let loopCount = 0;
    for (const image of ProductFetch.images) {
      ProductFetch.images[loopCount] = await fetchImageUrl(image);
      loopCount++;
    }
  }

  res.status(200).json({ status: "Success", data: ProductFetch });
});

// public function to fetch all products of a particular category
export const fetchProductsCategoryGet = TryCatch(async (req, res) => {
  const data = req.params.data;

  if (data == "" || data == null) throw new Error("Unknown error");

  const Products = await Product.find({ category: data });

  if (Products.length > 0 && envConfig.env === "production") {
    for (const product of Products) {
      product.images = await fetchImageUrl(product.images[0]);
    }
  }

  res.status(200).json({ status: "Success", data: Products });
});

// public function to fetch all products in their categories
export const fetchProductsCategoriesGet = TryCatch(async (req, res) => {
  const Categories = [
    "roughages",
    "fruits",
    "root tubers",
    "vegetables",
    "grains and flour",
    "meats",
    "fats&oils",
    "herbs&spices",
    "juice&meals",
    "popular",
  ];

  const Products = [];

  for (const category of Categories) {
    let products = await Product.find({ category });

    if (!products) products = await Product.find({ subCategory: category });

    if (category == "popular") products = await Product.find().limit(10);

    if (products.length > 0 && envConfig.env === "production") {
      for (const product of products) {
        product.images = await fetchImageUrl(product.images[0]);
      }
    }

    Products.push({ category, products });
  }

  res.status(200).json({ status: "Success", data: Products });
});

// public function to fetch filterd products
export const fetchProductsFilterGet = TryCatch(async (req, res) => {
  const data = req.params.data ? JSON.parse(req.params.data) : [];

  // check if filter params have been passed. If no return all Products in the database
  if (data?.length === 0) {
    let Products = await Product.find();

    if (envConfig.env === "production") {
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

        if (envConfig.env === "production") {
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

      if (envConfig.env === "production") {
        for (const product of Products) {
          product.images = await fetchImageUrl(product.images[0]);
        }
      }

      return res.status(200).json({ status: "Success", data: Products });
    } else {
      let HighestProducts = await Product.find();
      HighestProducts = HighestProducts.sort((a, b) => b.price - a.price);

      if (envConfig.env === "production") {
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

        if (envConfig.env === "production") {
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

      if (envConfig.env === "production") {
        for (const product of Products) {
          product.images = await fetchImageUrl(product.images[0]);
        }
      }

      return res.status(200).json({ status: "Success", data: Products });
    } else {
      let LowestProducts = await Product.find();
      LowestProducts = LowestProducts.sort((a, b) => a.price - b.price);

      if (envConfig.env === "production") {
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

  if (envConfig.env === "production") {
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

  if (envConfig.env === "production") {
    for (const product of CartProductsItems) {
      product.images = await fetchImageUrl(product.images[0]);
    }
  }

  res
    .status(200)
    .json({ status: "Success", data: { CartItems, CartProductsItems } });
});

// public function to retrieve search params
export const productSearchGet = TryCatch(async (req, res) => {
  const data = req.params.data;

  const ProductsFetch = await Product.find();

  if (envConfig.env === "production") {
    for (const product of ProductsFetch) {
      product.images = await fetchImageUrl(product.images[0]);
    }
  }

  const Products = [];

  ProductsFetch.forEach((product) => {
    // search product by product name
    if (
      product.name
        .toString()
        .toLowerCase()
        .indexOf(data.toString().toLowerCase()) > -1
    ) {
      Products.push(product);
    }

    // search product by category
    if (
      product.category
        .toString()
        .toLowerCase()
        .indexOf(data.toString().toLowerCase()) > -1
    ) {
      Products.push(product);
    }

    // search product by sub category
    if (product?.subCategory && product?.subCategory.length > 0) {
      for (const subCategory of product?.subCategory) {
        if (
          subCategory
            .toString()
            .toLowerCase()
            .indexOf(data.toString().toLowerCase()) > -1
        ) {
          Products.push(product);
        }
      }
    }
  });

  res.status(200).json({ status: "Success", Products });
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

// private function to fetch orders
export const fetchOrderGet = TryCatch(async (req, res) => {
  const param = req.params.data;

  if (!param || param == undefined) throw new Error("Unexpected error");

  const Orders = await Order.findOne({ _id: param });

  res.status(200).json({ status: "Success", data: Orders });
});

// private function to fetch comments
export const fetchCommentsGet = TryCatch(async (req, res) => {
  const newsblog = req.params.data;

  const Comments = await Comment.find({ newsblog }).lean();

  for (const comment of Comments) {
    let user = await User.findOne({ _id: comment.user })
      .lean()
      .select("-password");

    !user &&
      (await Admin.findOne({ _id: comment.user })).lean().select("-password");

    !user && (user = { firstname: "John", lastname: "Doe" });

    comment.user = user;
  }

  res.status(200).json({ status: "Success", data: Comments });
});

// route to  fetch newsblogs
export const fetchNewsblogsGet = TryCatch(async (req, res) => {
  const Newsblogs = await Newsblog.find();

  if (envConfig.env === "production") {
    for (const newsblog of Newsblogs) {
      newsblog.image = await fetchImageUrl(newsblog.image);
    }
  }

  res.status(200).json({ status: "Success", data: Newsblogs });
});

// route to fetch a newsblog
export const fetchNewsblogGet = TryCatch(async (req, res) => {
  const ID = req.params.data;

  const FetchedNewsblog = await Newsblog.findOne({ _id: ID });

  if (envConfig.env === "production") {
    FetchedNewsblog.image = await fetchImageUrl(FetchedNewsblog.image);
  }

  res.status(200).json({ status: "Success", data: FetchedNewsblog });
});

export const fetchBlogPostsGet = TryCatch(async (req, res) => {});

// private function to fetch subscription card plans
export const fetchSubscriptionCards = TryCatch(async (req, res) => {
  const Cards = await SubscriptionCard.find();

  res.status(200).json({ status: "Success", data: Cards });
});

export const fetchNewslettersGet = TryCatch(async (req, res) => {
  const Newsletters = await Newsletter.find();

  res.status(200).json({ status: "Success", data: Newsletters });
});
