import { Schema, model } from "mongoose";

const subscriptionSchema = Schema(
  {
    userId: String,
    user: Object,
    cards: Array,
    status: String,
    expiresOn: Date,
  },
  { timestamps: true }
);

const Subscription = model("Subscription", subscriptionSchema);

export default Subscription;
