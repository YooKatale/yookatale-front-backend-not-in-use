import jwt from "jsonwebtoken";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";
import { Resend } from "resend";
import { htmlEmails } from "../constants/constant.js";
import nodemailer from "nodemailer";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;
const sinbKey = process.env.SINB_KEY;
const resendKey = process.env.RESEND_KEY;

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

export const sendEmail = (param) => {
  let defaultClient = SibApiV3Sdk.ApiClient.instance;

  // Configure API key authorization: api-key
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = sinbKey;

  let partnerKey = defaultClient.authentications["partner-key"];
  partnerKey.apiKey = sinbKey;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

  sendSmtpEmail = {
    to: [
      {
        email: param?.user?.email,
        name: `${param?.user?.firstname} ${param?.user?.lastname}`,
      },
    ],
    templateId: 1,
    params: {
      ORDER_ID: "1234567890",
      EMAIL: param?.user?.email,
    },
    headers: {
      "X-Mailin-custom":
        "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
    },
  };

  return apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log({ data });
      return "success";
    },
    function (error) {
      console.log({ error });
      return error;
    }
  );
};

export const sendEmailMessage = async (emailOptions, emailTemplate) => {
  try {
    // Initialize nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "info@yookatale.com",
        pass: "YourEmailPassword",
      },
    });

    // Construct the email message
    const mailOptions = {
      from: "YourEmailAddress",
      to: emailOptions.user.email,
      subject: "Welcome to YooKatale",
      html: emailTemplate(emailOptions.user.firstname), // Use the template with user's firstname
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);

    return "success";
  } catch (error) {
    console.error("Error sending email: ", error);
    return "error";
  }
};

export const resendEmail = async (params) => {
  const resend = new Resend(resendKey);
  let response = "";

  if (!params) return (response = "error");

  let htmlTemplate = "";

  if (params?.template == "order") {
    htmlTemplate = htmlEmails.orderTemplate({
      orderID: params?.orderID,
      orderFor: params?.orderFor,
      orderTotal: `UGX ${params?.orderTotal}`,
      deliveryAddress: params?.deliveryAddress,
    });
  }

  if (params?.template == "welcome") {
    htmlTemplate = htmlEmails.welcomeTemplate(params?.name);
  }

  if (params?.template == "message") {
    htmlTemplate = htmlEmails.messageTemplate({
      email: params?.email,
      name: params?.name,
      message: params?.message,
    });
  }

  if (params?.template == "loginDetails") {
    htmlTemplate = htmlEmails.loginDetailsTemplate({
      email: params?.email,
      firstname: params?.firstname,
      username: params?.username,
      password: params?.password,
    });
  }

  try {
    const res = await resend.emails.send({
      from: params?.from,
      to: params?.to,
      subject: params?.subject,
      html: htmlTemplate,
    });

    if (res?.id) {
      response = "success";
    }
  } catch (error) {
    console.log(error);
    response = "Error occured";
  }

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
