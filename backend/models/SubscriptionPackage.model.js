import { Schema, model } from "mongoose";

const subscriptionPackageSchema = Schema(
  {
    type: String,
    price: Number,
    name: String,
    details: Array,
    previousPrice: Number,
  },
  { timestamps: true }
);

const SubscriptionPackage = model(
  "SubscriptionPackage",
  subscriptionPackageSchema
);

export default SubscriptionPackage;
