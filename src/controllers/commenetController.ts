import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";

export const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getComments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
