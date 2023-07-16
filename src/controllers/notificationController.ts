import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";

import Notification from "../models/notificationModels";
import { CustomRequest } from "../interfaces/Custom";
import AppError from "../utils/appError";

// Create a new notification
export const createNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, message } = req.body;

    // Create the notification
    const notification = await Notification.create({ user, message });

    res.status(201).json({
      status: "success",
      data: {
        notification,
      },
    });
  }
);

// Get all notifications for a user
export const getAllNotifications = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    // Find the user's notifications
    const notifications = await Notification.find({ user: userId });

    res.status(200).json({
      status: "success",
      data: {
        notifications,
      },
    });
  }
);

// Get a specific notification
export const getNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const notificationId = req.params.id;

    // Find the notification by ID
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return next(new AppError("Notification not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        notification,
      },
    });
  }
);

// Update a notification
export const updateNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const notificationId = req.params.id;
    const { message } = req.body;

    // Find the notification by ID and update the message
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { message },
      { new: true }
    );

    if (!notification) {
      return next(new AppError("Notification not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        notification,
      },
    });
  }
);

// Delete a notification
export const deleteNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const notificationId = req.params.id;

    // Find the notification by ID and delete it
    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return next(new AppError("Notification not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
