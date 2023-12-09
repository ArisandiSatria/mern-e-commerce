import { errorHandler } from "./errorHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, "Unauthorized"));

    const isVerified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(isVerified.id).select("-password");

    if (!user) {
      return next(errorHandler(401, "User not found!"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
