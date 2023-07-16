import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../interfaces/Custom";
import AppError from "../utils/appError";

// Express middleware function to check admin role
export const checkAdminRole = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // Assuming you have the `user` property in the `req` object
  const user = req.user;

  // Extract the role from the user object
  const role = user?.role;

  if (role !== "admin") {
    // If the user is not an admin, send a forbidden response
    return next(new AppError("Only admins can perform this action", 403));
  }

  // If the user is an admin, continue to the next middleware or route handler
  next();
};
