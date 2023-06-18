import User from "../models/User.model.js";
import { TryCatch, generateToken } from "../utils/utils.js";

// public route to sign in
export const authUserPost = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new Error("User account not found");

  if (!(await user.matchPasswords(password))) throw new Error("Wrong password");

  generateToken(res, user._id);

  res.status(200).json({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
  });
});

// public route to sign up user
export const registerUserPost = TryCatch(async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;

  if (!firstname || firstname == "") throw new Error("Firstname is required");
  if (!lastname || lastname == "") throw new Error("Lastname is required");
  if (!email || email == "") throw new Error("Email is required");
  if (!phone || phone == "") throw new Error("Phone number is required");
  if (!password || password == "") throw new Error("Password is required");

  const findUser = await User.findOne({ email });

  if (findUser) throw new Error("Account already exists");

  const user = await User.create({
    firstname,
    lastname,
    email,
    phone,
    password,
  });

  generateToken(res, user._id);

  res.status(200).json({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
  });
});
