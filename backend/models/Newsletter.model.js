import { Schema, model } from "mongoose";

const newsletterSchema = Schema(
  {
    email: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Newsletter = model("newsletter", newsletterSchema);

export default Newsletter;
