import chalk from "chalk";
import User from "../models/User.model.js";
import { TryCatch } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import { format } from "date-fns";
import { v4 } from "uuid";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import fs from "fs";
import path from "path";

const newID = v4();
const fsPromises = fs.promises;

export const Protect = TryCatch(async (req, res, next) => {
  let token = req.cookies.jwtYookatale;

  if (!token) throw new Error("Not authorized. No token found");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.userId).select("-password");

  next();
});

export const NotFound = (req, res, next) => {
  const error = new Error(`Page not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const ErrorHandler = (err, req, res, next) => {
  let statusCode =
    req.statusCode === 200 ? 500 : res.statusCode ? res.statusCode : 400;

  let message = err.message;

  statusCode === 200 ? (statusCode = 400) : (statusCode = statusCode);

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Database error. Resource not found";
  }

  process.env.NODE_ENV === "development" &&
    console.log("\n" + chalk.redBright(message) + "\n");

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export const Logger = TryCatch(async (req, res, next) => {
  const dateTime = `${format(new Date(), "yyyy-MM-dd\t-\tHH:mm:ss")}`;
  const logData = `${dateTime}\t-\t${newID}\t-\t${`${req.method}\t-\t${req.headers.origin}\t-\t${req.url}`}\n`;

  if (!fs.existsSync(path.join(__dirname, "../public/", "logs")))
    await fsPromises.mkdir(path.join(__dirname, "logs"));

  await fsPromises.appendFile(
    path.join(__dirname, "../public/", "logs", "requestLogs.txt"),
    logData
  );

  next();
});
