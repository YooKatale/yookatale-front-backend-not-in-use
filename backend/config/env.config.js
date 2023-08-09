import dotenv from "dotenv";

dotenv.config();

// env variables
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;
const jwtSign = process.env.JWT_SECRET_SIGN;
const env = process.env.NODE_ENV;

export default {
  bucketName,
  bucketRegion,
  awsAccessKey,
  awsSecretKey,
  jwtSign,
  env,
};
