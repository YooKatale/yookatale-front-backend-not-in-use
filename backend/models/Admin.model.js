import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    gender: String,
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = model("Admin", adminSchema);

export default Admin;
