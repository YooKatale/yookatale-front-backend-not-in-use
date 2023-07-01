import mongoose from "mongoose";
import { TryCatch } from "../utils/utils.js";
import chalk from "chalk";

export const connectDB = async () => {
  const conn = await mongoose.connect(
    process.env.NODE_ENV === "production"
      ? `${process.env.MONGO_PROD_URI}`
      : process.env.MONGO_URI
  );

  console.log(
    chalk.greenBright(`MongoDB database connected: ${conn.connection.host}`)
  );
};
