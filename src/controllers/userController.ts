import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/appError";
import { ApiFeatures } from "../utils/apiFeatures";
import { CustomRequest } from "../interfaces/Custom";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address } = req.body;

    const existingUser = await User.findOne({ publicAddress: address });

    // Check if user exists
    if (existingUser) {
      return next(new AppError("User already exists", 409));
    }

    // Save new user to the  database
    const user = new User();
    user.publicAddress = address;
    user.photoUrl = `https://avatars.dicebear.com/api/bottts/${address}.svg`;

    await user.save();

    res.status(201).json({
      status: "success",
      message: "Account Created",
      user,
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
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(new AppError("User does not exist", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);

export const getNonce = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const publicAddress = req.query.publicAddress;

    console.log(publicAddress);

    if (!publicAddress)
      return next(new AppError("publicAddress missing from query", 401));

    const user = await User.findOne({ publicAddress });

    // if (!user)
    //   return next(
    //     new AppError(
    //       "There's no nonce for this user or user does not exists",
    //       404
    //     )
    //   );

    res.status(200).json({
      status: "success",
      data: {
        nonce: user?.nonce,
      },
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address } = req.query;
    const user = await User.findOneAndUpdate(
      { publicAddress: address },
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return next(new AppError("No user found with that id", 404));
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address } = req.query;
    const user = await User.findOneAndDelete({ publicAddress: address });

    if (!user) {
      return next(new AppError("No user found with that id", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
