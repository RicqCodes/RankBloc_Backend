import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";

export const createUser = catchAsync(async (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
});

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
