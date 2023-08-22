import { Schema, model } from "mongoose";

const emailSchema = Schema({
  to: String,
  subject: String,
  message: String,
  sent: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


const Email = model("Email", emailSchema);

export default Email;
