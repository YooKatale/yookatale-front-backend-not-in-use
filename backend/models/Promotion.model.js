import { Schema, model } from "mongoose";

const promotionSchema = Schema(
  {
    promotionProduct: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Please provide product ID"],
        },
        promotionTag: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Promotion = model("Promotion", promotionSchema);

export default Promotion;
