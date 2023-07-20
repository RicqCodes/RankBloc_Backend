import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { CustomRequest } from "../interfaces/Custom";
import AppError from "../utils/appError";
import UserRelationship from "../models/followingModel";
import { Types } from "mongoose";

export const followUser = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const { userIdToFollow } = req.params;

    // Check if ids are valid
    if (
      !Types.ObjectId.isValid(userId) ||
      !Types.ObjectId.isValid(userIdToFollow)
    ) {
      return next(new AppError("Invaid user ID", 400));
    }

    // Check if the target user (userIdToFollow) exists in the database
    const targetUser = UserRelationship.findById(userIdToFollow);

    if (!targetUser) {
      return next(new AppError("User not found", 404));
    }

    // Check if the user is already following the target user
    const userRelationship = await UserRelationship.findOne({
      following: userId,
      followee: userIdToFollow,
    });

    if (userRelationship) {
      return next(new AppError("You are already following this user", 409));
    }

    // If not already following, create a new UserRelationship document
    await UserRelationship.create({
      follower: userId,
      followee: userIdToFollow,
    });

    res.status(201).json({
      status: "Success",
      message: "User followed successfully",
    });
  }
);

export const unfollow = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const { userIdToUnfollow } = req.params;

    // Check if ids are valid
    if (
      !Types.ObjectId.isValid(userId) ||
      !Types.ObjectId.isValid(userIdToUnfollow)
    ) {
      return next(new AppError("Invaid user ID", 400));
    }

    // Check if the user {userIdToUnfollow} exists in the database
    const targetUser = UserRelationship.findById(userIdToUnfollow);

    if (!targetUser) {
      return next(new AppError("User not found", 404));
    }

    // Check if the user is already following the target user
    const userRelationship = UserRelationship.findOne({
      follower: userId,
      followee: userIdToUnfollow,
    });

    if (!userRelationship) {
      return next(new AppError("You do not follow this user", 404));
    }

    // Delete from database
    await UserRelationship.findOneAndDelete({
      follower: userId,
      followee: userIdToUnfollow,
    });

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export const getAllFollowers = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    // Check if userId is valid
    if (!Types.ObjectId.isValid(userId)) {
      return next(new AppError("Invaid user ID", 400));
    }

    const followers = await UserRelationship.aggregate([
      { $match: { followee: userId } },
      {
        $lookup: {
          from: "users",
          localField: "follower",
          foreignField: "_id",
          as: "follower",
        },
      },
      { $unwind: "$follower" },
    ]);

    if (!followers) {
      return next(new AppError("No followers found", 404));
    }

    res.status(200).json({
      status: "success",
      results: followers.length,
      data: {
        followers,
      },
    });
  }
);

export const getAllFollowing = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    // Check if userId is valid
    if (!Types.ObjectId.isValid(userId)) {
      return next(new AppError("Invaid user ID", 400));
    }

    const followings = await UserRelationship.aggregate([
      { $match: { follower: userId } },
      {
        $lookup: {
          from: "users",
          localField: "followee",
          foreignField: "_id",
          as: "followee",
        },
      },
    ]);

    if (!followings) {
      return next(new AppError("No followings found", 404));
    }

    res.status(200).json({
      status: "success",
      results: followings.length,
      data: {
        followings,
      },
    });
  }
);

export const checkFollow = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userId, otherUserId } = req.params;

    if (
      !Types.ObjectId.isValid(userId) ||
      !Types.ObjectId.isValid(otherUserId)
    ) {
      return next(new AppError("Invaid user ID", 400));
    }

    // Check if the user follows the other user
    const userRelationship = await UserRelationship.findOne({
      user: userId,
      followee: otherUserId,
    });

    if (userRelationship) {
      return res.json({ message: "You are following this user" });
    } else {
      return res.json({ message: "You are not following this user" });
    }
  }
);
