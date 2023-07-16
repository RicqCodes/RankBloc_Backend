import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/appError";
import { ApiFeatures } from "../utils/apiFeatures";

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

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Execute query
    const features = new ApiFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const users = await features.query;

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address } = req.query;

    const user = await User.findOne({ publicAddress: address });

    if (!user) {
      next(new AppError("User does not exist", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { address } = req.query;
  const user = await User.findOneAndUpdate(
    { publicAddress: address },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

export const deleteUser = catchAsync((req: Request, res: Response) => {
  const { address } = req.query;
  User.findOneAndDelete({ publicAddress: address });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
