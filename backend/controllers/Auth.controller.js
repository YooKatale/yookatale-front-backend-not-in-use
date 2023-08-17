import { addDays } from "date-fns";
import User from "../models/User.model.js";
import { TryCatch, generateToken, resendEmail } from "../utils/utils.js";
import validator from "validator";

// public route to sign in user
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
    gender: user.gender,
    vegan: user.vegan,
    phone: user.phone,
    expires: addDays(new Date(), 3),
  });
});

// public route to sign up user
export const registerUserPost = TryCatch(async (req, res) => {
  const { firstname, lastname, email, phone, gender, vegan, dob, password } =
    req.body;

  console.log(req.body);

  if (!firstname || firstname == "") throw new Error("Firstname is required");
  if (!lastname || lastname == "") throw new Error("Lastname is required");
  if (!email || email == "") throw new Error("Email is required");
  if (!phone || phone == "") throw new Error("Phone number is required");
  if (!gender || gender == "") throw new Error("Gender is required");
  if (!dob || dob == "") throw new Error("Date of birth is required");
  if (!password || password == "") throw new Error("Password is required");
  if (!validator.isEmail(email)) throw new Error("Email is invalid");

  const findUser = await User.findOne({ email });

  if (findUser) throw new Error("Account already exists");

  const user = await User.create({
    firstname,
    lastname,
    email,
    gender,
    vegan,
    phone,
    password,
    dob,
  });

  generateToken(res, user._id);

  await resendEmail({
    template: "welcome",
    from: "info@yookatale.com",
    to: user.email,
    subject: `Welcome, ${user.firstname}`,
  });

  res.status(200).json({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    gender: user.gender,
    vegan: user.vegan,
    phone: user.phone,
    dob: user.dob,
    expires: addDays(new Date(), 3),
  });
});

// public route to logout user and remove token
export const logoutUserPost = TryCatch(async (req, res) => {
  res.cookie("jwtYookatale", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out" });
});
