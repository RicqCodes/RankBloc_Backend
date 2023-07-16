import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import Category from "../models/categoriesModel";
import { ApiFeatures } from "../utils/apiFeatures";
import AppError from "../utils/appError";

export const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await Category.create(req.body);

    res.status(201).json({
      status: "sucess",
      message: "Category successfully created",
    });
  }
);

export const getAllCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Execute query
    const features = new ApiFeatures(Category.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const categories = await features.query;

    res.status(200).json({
      status: "success",
      results: categories.length,
      data: {
        categories,
      },
    });
  }
);

export const getCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
      next(new AppError("Category not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  }
);

export const updateCateogry = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category) {
      next(new AppError("Category not found", 404));
    }

    res.status(200).json({ status: "success", data: { category } });
  }
);

export const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      next(new AppError("Category not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
