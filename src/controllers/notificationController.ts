import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";

export const createNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getAllNotifications = catchAsync(async () => {});

export const getNotification = catchAsync(async () => {});

export const updateNotification = catchAsync(async () => {});

export const deleteNotification = catchAsync(async () => {});
