import { Schema, model } from "mongoose";

const discountSchema = Schema(
  {
    discountedProduct: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Please provide product ID"],
        },
        discountPercentage: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Discount = model("Discount", discountSchema);

export default Discount;
