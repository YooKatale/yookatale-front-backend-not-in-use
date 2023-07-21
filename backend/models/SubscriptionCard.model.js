import { Schema, model } from "mongoose";

const subscriptionCardSchema = Schema(
  {
    type: String,
    price: Number,
    name: String,
    details: Array,
    previousPrice: Number,
  },
  { timestamps: true }
);

const SubscriptionCard = model("SubscriptionCard", subscriptionCardSchema);

export default SubscriptionCard;
