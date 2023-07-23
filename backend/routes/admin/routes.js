import express from "express";
import multer from "multer";
import { v4 as uniqueString } from "uuid";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import {
  approveSubscriptionsPut,
  authAdminPost,
  createNewProductPost,
  createNewsblogPost,
  createSubscriptionCard,
  deleteNewsblog,
  deleteProductDelete,
  editProductPost,
  fetchAccountsGet,
  fetchDashboardGet,
  fetchSubscriptionsGet,
  registerAdminPost,
  updateUserPut,
} from "../../controllers/admin/Controller.js";

import { Protect } from "../../middleware/middleware.js";

dotenv.config();

const env = process.env.NODE_ENV;

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, uniqueString() + file.originalname);
  },
});

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: env === "production" ? memoryStorage : storage,
});

router.post("/auth", authAdminPost);
router.post("/register", registerAdminPost);
router.post("/product/new", upload.array("images", 10), createNewProductPost);
router.put("/product/edit", upload.array("images", 10), editProductPost);
router.get("/accounts", fetchAccountsGet);
router.delete("/product/:data", deleteProductDelete);
router.put("/account", updateUserPut);
router.post("/subscription/card", createSubscriptionCard);
router.get("/dashboard", fetchDashboardGet);
router.get("/subscriptions/:data", fetchSubscriptionsGet);
router.put("/subscriptions/:data", approveSubscriptionsPut);
router.post("/newsblog", upload.single("image"), createNewsblogPost);
router.delete("/newsblog/:data", deleteNewsblog);

export default router;
