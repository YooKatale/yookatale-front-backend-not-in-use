import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import chalk from "chalk";
import router from "./routes/routes.js";
import { connectDB } from "./config/db.config.js";
import { ErrorHandler, Logger, NotFound } from "./middleware/middleware.js";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { TryCatch } from "./utils/utils.js";

const env = process.env.NODE_ENV;

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 4400;

console.log("\t\n_\n\t");

// connect to DB
TryCatch(connectDB());

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(Logger);

const whitelist = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://www.yookatale.com",
  "https://admin.yookatale.com",
  "admin.yookatale.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (whitelist.indexOf(origin) === -1)
      return callback(new Error("Access denied"));

    return callback(null, true);
  },
  optionSuccessStatus: 200,
  credentials: true,
};

// app.use(env === "production" ? cors(corsOptions) : cors());
app.use(cors(corsOptions));
app.use("/api", router);

app.use(NotFound);
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(chalk.blue(`Server is currently running`));
  console.log(chalk.blueBright(`Server Port: ${PORT}`));
});
