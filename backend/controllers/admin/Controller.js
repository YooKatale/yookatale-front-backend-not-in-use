import { addDays } from "date-fns";
import Admin from "../../models/Admin.model.js";
import { TryCatch, generateToken, resendEmail } from "../../utils/utils.js";
import { Logger } from "../../middleware/middleware.js";
import Product from "../../models/Product.model.js";
import dotenv from "dotenv";
import validator from "validator";
import { v4 as uniqueString } from "uuid";
import bcrypt from "bcryptjs";
import PasswordGen from "password-npm";

dotenv.config();

// env letiables
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;
const jwtSign = process.env.JWT_SECRET_SIGN;
const env = process.env.NODE_ENV;

// public route to sign in admin
export const authAdminPost = TryCatch(async (req, res) => {
  const { username, password } = req.body;

  if (!username) throw new Error("Username is required");

  if (!password) throw new Error("Password is required");

  const user = await Admin.findOne({ username });

  if (!user) throw new Error("User account not found");

  if (!(await user.matchPasswords(password))) throw new Error("Wrong password");

  if (user?.tempPassword !== "")
    await Admin.findOneAndUpdate({ _id: user._id }, { tempPassword: "" });

  generateToken(res, user._id);

  res.status(200).json({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    gender: user.gender,
    phone: user.phone,
    account: user.accountType,
    expires: addDays(new Date(), 3),
  });
});

// public route to sign up admin
export const registerAdminPost = TryCatch(async (req, res) => {
  const { firstname, lastname, email, phone, gender, accountType } = req.body;

  if (!firstname || firstname == "") throw new Error("Firstname is required");
  if (!lastname || lastname == "") throw new Error("Lastname is required");
  if (!email || email == "") throw new Error("Email is required");

  if (!validator.isEmail(email)) throw new Error("Email is invalid");

  const findUser = await Admin.findOne({ firstname, lastname });

  if (findUser) throw new Error("Account already exists");

  const password = new PasswordGen(8, true, true, true, false).random();

  const username = `${firstname}_${
    lastname.toString().length > 3 ? lastname.toString().slice(0, 3) : lastname
  }`;

  const response = await resendEmail({
    template: "loginDetails",
    email,
    firstname,
    username,
    password,
    to: email,
    from: "info@yookatale.com",
    subject: "Account details",
  });

  if (response == "Error occured") throw new Error("Email not sent");

  const user = await Admin.create({
    firstname,
    lastname,
    username,
    email,
    gender,
    phone,
    password,
    tempPassword: password,
    accountType,
    permissions: accountType == "root" ? ["all"] : [],
  });

  // const response = await resendEmail({
  //   template: "welcome",
  //   name: user.firstname,
  // });

  res.status(200).json({ status: "Success", data: email });
});

// private route to update user info
export const updateUserPut = TryCatch(async (req, res) => {
  const {
    id,
    firstname,
    lastname,
    username,
    email,
    phone,
    gender,
    currPassword,
    password,
  } = req.body;

  if (!validator.isEmail(email)) throw new Error("Email is invalid");

  if (!currPassword || currPassword == "")
    throw new Error("Enter your current password");

  const user = await Admin.findOne({ _id: id });

  if (!user) throw new Error("User account not found");

  if (!(await user.matchPasswords(currPassword)))
    throw new Error("Wrong password");

  if (password === currPassword) throw new Error("Password rejected");

  // hash password
  const salt = await bcrypt.genSalt(10);

  const newPassword =
    password == ""
      ? await bcrypt.hash(currPassword, salt)
      : await bcrypt.hash(password, salt);

  await Admin.findOneAndUpdate(
    { _id: user._id },
    {
      firstname,
      lastname,
      username,
      email,
      phone,
      gender,
      password: newPassword,
    }
  );

  const updatedUser = await Admin.findOne({ _id: user._id }).select(
    "-password"
  );

  res.status(200).json({ status: "Success", data: updatedUser });
});

// private route to create new products
export const createNewProductPost = TryCatch(async (req, res) => {
  const { name, category, description, subCategory, price } = req.body;

  if (!name || name == "") throw new Error("Product name is required");
  if (!category || category == "")
    throw new Error("Product category is required");
  if (!description || description == "")
    throw new Error("Product description is required");
  if (!price || price == "") throw new Error("Product price is required");
  if (req.files?.length < 1 || !req.files)
    throw new Error("Product Images are required");

  // uploading of images would ideally go here
  let images = [];

  if (env === "production") {
    for (const image of req.files) {
      const imageName = uniqueString();
      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: image.buffer,
        ContentType: image.mimetype,
      };
      const putCommand = new PutObjectCommand(params);

      await S3.send(putCommand);

      images.push(imageName);
    }
  } else {
    images = req.files.map((file) => file.filename);
  }

  const newProduct = new Product({
    name,
    category,
    description,
    subCategory,
    images,
    price,
  });

  await newProduct.save();

  res.status(200).json({ status: "Success" });
});

// private route to create new products
export const editProductPost = TryCatch(async (req, res) => {
  const { id, product } = req.body;

  // check and make sure product id has been passed
  if (!id || id == "") throw new Error("Unexpected error");

  // get the product information that has been passed
  const ParsedProduct = JSON.parse(product);

  // uploading of images would ideally go here
  let images = [];

  // upload images to AWS Bucket if in production
  if (env === "production") {
    for (const image of req.files) {
      const imageName = uniqueString();
      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: image.buffer,
        ContentType: image.mimetype,
      };
      const putCommand = new PutObjectCommand(params);

      await S3.send(putCommand);

      images.push(imageName);
    }
  } else {
    images = req.files.map((file) => file.filename);
  }

  if (images.length < 1) images = Product.findOne({ _id: id })?.images;

  await Product.findOneAndUpdate(
    { _id: id },
    {
      name: ParsedProduct?.name,
      category: ParsedProduct?.category,
      description: ParsedProduct?.description,
      subCategory: ParsedProduct?.subCategory,
      images,
      price: ParsedProduct?.price,
    }
  );

  // // log record
  // await Logger.adminEventLogger(
  //   "EDIT",
  //   `${req?.user?.firstname} ${req?.user?.lastname}`,
  //   `Edited product ${ParsedProduct?.name}`
  // );

  res.status(200).json({ status: "Success" });
});

// private function to fetch a product
export const deleteProductDelete = TryCatch(async (req, res) => {
  const data = req.params.data;

  console.log({ data });

  const DelProduct = await Product.findOneAndRemove({ _id: data });

  // delete cart items of this product
  //   if (env === "production") {
  //     let loopCount = 0;
  //     for (const image of ProductFetch.images) {
  //       ProductFetch.images[loopCount] = await fetchImageUrl(image);
  //       loopCount++;
  //     }
  //   }

  // log record
  // await Logger.adminEventLogger(
  //   "DELETE",
  //   `${req?.user?.firstname} ${req?.user?.lastname}`,
  //   `Deleted ${DelProduct?.name}`
  // );

  res.status(200).json({ status: "Success" });
});

// private function to fetch accounts
export const fetchAccountsGet = TryCatch(async (req, res) => {
  const Accounts = await Admin.find({ accountType: { $nin: ["root"] } });

  res.status(200).json({ status: "Success", data: Accounts });
});
