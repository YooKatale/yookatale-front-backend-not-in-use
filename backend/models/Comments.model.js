import { Schema, model } from "mongoose";

const commentSchema = Schema(
  {
    user: String,
    Comment: String,
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export default Comment;
