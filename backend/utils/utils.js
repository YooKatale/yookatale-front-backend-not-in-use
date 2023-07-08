import jwt from "jsonwebtoken";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
  region: bucketRegion,
});

export const fetchImageUrl = async (key) => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: key,
  };

  const getCommand = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 * 3 });

  return url;
};

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("jwtYookatale", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development" ? true : false,
    sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

export const sanitizePhoneNumber = (phone) => {
  const phonePar = phone.toString();
  let error = "";
  const response = { phone: "", network: "" };

  // check if phone number is valid
  if (phonePar[0] === "0") {
    if (phonePar.length !== 10) {
      return (error = "Phone number is invalid");
    }

    // check which network the number belongs to
    if (
      phonePar.slice(0, 3) == "076" ||
      phonePar.slice(0, 3) == "077" ||
      phonePar.slice(0, 3) == "078" ||
      phonePar.slice(0, 3) == "031" ||
      phonePar.slice(0, 3) == "039"
    ) {
      response.network = "MTN";
      response.phone = phonePar;
    }

    if (
      phonePar.slice(0, 3) == "070" ||
      phonePar.slice(0, 3) == "075" ||
      phonePar.slice(0, 3) == "074" ||
      phonePar.slice(0, 3) == "020"
    ) {
      response.network = "AIRTEL";
      response.phone = phonePar;
    }
  }

  // check if phone number is valid
  if (phonePar[0] === "+" || phonePar[0] === "2") {
    if (phonePar.length !== 12 && phonePar.length !== 13) {
      return (error = "Phone number is invalid");
    }

    // check which network the number belongs to
    if (
      phonePar.slice(0, 7) == "076" ||
      phonePar.slice(0, 7) == "077" ||
      phonePar.slice(0, 7) == "078" ||
      phonePar.slice(0, 7) == "031" ||
      phonePar.slice(0, 7) == "039"
    ) {
      response.network = "MTN";
      response.phone = phonePar;
    }

    if (
      phonePar.slice(0, 7) == "070" ||
      phonePar.slice(0, 7) == "075" ||
      phonePar.slice(0, 7) == "074" ||
      phonePar.slice(0, 7) == "020"
    ) {
      response.network = "AIRTEL";
      response.phone = phonePar;
    }

    if (
      phonePar.slice(0, 6) == "076" ||
      phonePar.slice(0, 6) == "077" ||
      phonePar.slice(0, 6) == "078" ||
      phonePar.slice(0, 6) == "031" ||
      phonePar.slice(0, 6) == "039"
    ) {
      response.network = "MTN";
      response.phone = phonePar;
    }

    if (
      phonePar.slice(0, 6) == "070" ||
      phonePar.slice(0, 6) == "075" ||
      phonePar.slice(0, 6) == "074" ||
      phonePar.slice(0, 6) == "020"
    ) {
      response.network = "AIRTEL";
      response.phone = phonePar;
    }
  }

  if (response.network == "" || response.phone == "")
    return (error = "Only Airtel and Mtn networks are supported");

  return response;
};

export const TryCatch = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.log({ error });
    next(error);
  }
};
