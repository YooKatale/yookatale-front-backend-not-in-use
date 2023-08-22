import { Schema, model, Types } from "mongoose";

const scheduleSchema = Schema(
  {
    user: Types.ObjectId,
    products: Array,
    deliveryDays: Array,
    deliveryTime: String,
    repeatSchedule: Boolean,
    orderId: Types.ObjectId,
    status: String,
  },
  { timestamps: true }
);

const Schedule = model("Schedule", scheduleSchema);

export default Schedule;
