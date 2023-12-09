import { errorHandler } from "./errorHandler.js";

export const verifyAdmin = async (req, res, next) => {
  req.user && req.user.role == "admin" ? next() : next(errorHandler(401, "Admin only!"))
};
