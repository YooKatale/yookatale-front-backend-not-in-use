import express from "express";
import { authUserPost, registerUserPost } from "../controllers/Controller.js";
const router = express.Router();

router.post("/users/auth", authUserPost);
router.post("/users/register", registerUserPost);

export default router;
