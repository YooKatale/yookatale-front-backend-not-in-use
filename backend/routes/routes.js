import express from "express";
import multer from "multer";
import { v4 as uniqueString } from "uuid";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Protect } from "../middleware/middleware.js";

import {
  authUserPost,
  logoutUserPost,
  registerUserPost,
} from "../controllers/Auth.controller.js";
import {
  fetchCartGet,
  fetchCommentsGet,
  fetchNewsblogGet,
  fetchNewsblogsGet,
  fetchNewslettersGet,
  fetchOrderGet,
  fetchOrdersGet,
  fetchProductGet,
  fetchProductsCategoriesGet,
  fetchProductsCategoryGet,
  fetchProductsFilterGet,
  fetchProductsGet,
  fetchSubscriptionCards,
  productSearchGet,
} from "../controllers/Get.controller.js";
import {
  createCartCheckoutPost,
  createCartPost,
  createCommentPost,
  createNewsletterPost,
  createScheduleDeliveryPost,
  createSubscriptionPost,
  sendMessagePost,
} from "../controllers/Post.controller.js";
import { deleteCart } from "../controllers/Delete.controller.js";
import { updateOrderPut } from "../controllers/Put.controller.js";

dotenv.config();

const env = process.env.NODE_ENV;

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, uniqueString() + file.originalname);
  },
});

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: env === "production" ? memoryStorage : storage,
});

router.post("/users/auth", authUserPost);
router.post("/users/register", registerUserPost);
router.post("/users/logout", logoutUserPost);
router.get("/products", fetchProductsGet);
router.get("/products/categories", fetchProductsCategoriesGet);
router.get("/product/:data", fetchProductGet);
router.get("/products/:data", fetchProductsCategoryGet);
router.get("/products/filter/:data", fetchProductsFilterGet);
router.route("/product/cart").post(Protect, createCartPost);
router
  .route("/product/cart/:data", Protect)
  .get(fetchCartGet)
  .delete(deleteCart);
router.post("/products/cart/checkout", createCartCheckoutPost);
router.get("/products/search/:data", productSearchGet);

router.get("/products/orders/:data", Protect, fetchOrdersGet);
router.get("/products/order/:data", Protect, fetchOrderGet);
router.put("/products/order", updateOrderPut);
//router.get("/users/comments", fetchCommentsGet);
router.post("/subscription", createSubscriptionPost);
router.post("/message", sendMessagePost);
router.get("/subscription", fetchSubscriptionCards);
router.get("/newsblogs", fetchNewsblogsGet);
router.get("/newsblog/:data", fetchNewsblogGet);
router.post("/newsletter", createNewsletterPost);
router.get("/newsletter", fetchNewslettersGet);

router.get("/newsblogs/comments/:data", fetchCommentsGet);
router.post("/newsblogs/comments", createCommentPost);

router.post("/products/schedule", createScheduleDeliveryPost);
// router.get("/blogs")
// router.get("/payment/webhook", paymentWebhookGet);

export default router;
