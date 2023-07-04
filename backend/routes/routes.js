import express from "express";
import {
  authUserPost,
  createCartPost,
  createNewOrderPost,
  createNewProductPost,
  deleteCart,
  fetchCartGet,
  fetchCommentsGet,
  fetchOrdersGet,
  fetchProductGet,
  fetchProductsCategoryGet,
  fetchProductsFilterGet,
  fetchProductsGet,
  logoutUserPost,
  productSearchGet,
  registerUserPost,
} from "../controllers/Controller.js";
import multer from "multer";
import { v4 as uniqueString } from "uuid";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Protect } from "../middleware/middleware.js";

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
router.post("/product/new", upload.array("images", 10), createNewProductPost);
router.get("/products", fetchProductsGet);
router.get("/product/:data", fetchProductGet);
router.get("/products/:data", fetchProductsCategoryGet);
router.get("/products/filter/:data", fetchProductsFilterGet);
router.route("/product/cart").post(Protect, createCartPost);
router
  .route("/product/cart/:data", Protect)
  .get(fetchCartGet)
  .delete(deleteCart);
router.get("/products/search/:data", productSearchGet);
router.post("/products/order", Protect, createNewOrderPost);
router.get("/products/order/:data", Protect, fetchOrdersGet);
router.get("/users/comments", fetchCommentsGet);

export default router;
