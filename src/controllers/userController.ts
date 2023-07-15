import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/appError";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, signedMessage } = req.body;

    const existingUser = await User.findOne({ publicAddress: address });

    // Check if user exists
    if (existingUser) {
      next(new AppError("User already exists", 409));
    }

    // Save new user to the  database
    const user = new User();
    user.publicAddress = address;
    user.signedMessage = signedMessage;
    await user.save();

    res.status(201).json({
      status: "success",
      message: "Account Created",
    });
  }
);

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
});

export const deleteUser = catchAsync((req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
});
