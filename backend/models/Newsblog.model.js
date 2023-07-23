import { Schema, model } from "mongoose";

const NewsblogSchema = Schema(
  {
    author: String,
    blog: String,
    title: String,
    image: String,
  },
  { timestamps: true }
);

const Newsblog = model("newsblog", NewsblogSchema);

export default Newsblog;
