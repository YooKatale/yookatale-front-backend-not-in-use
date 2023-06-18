import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("jwttatli", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development" ? true : false,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

export const TryCatch = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.log({ error });
    next(error);
  }
};
