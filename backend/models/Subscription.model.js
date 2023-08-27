import { Schema, model, Types } from "mongoose";

const subscriptionSchema = Schema(
  {
    userId: Types.ObjectId,
    packageId: Types.ObjectId,
    orderId: Types.ObjectId,
    status: String,
    expiresOn: Date,
  },
  { timestamps: true }
);

const Subscription = model("Subscription", subscriptionSchema);

export default Subscription;
