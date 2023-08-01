import { Schema, model } from "mongoose";

const commentSchema = Schema(
  {
    user: String,
    newsblog: String,
    comment: String,
    replies: Array,
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export default Comment;
