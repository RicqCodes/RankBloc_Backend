import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCateogry,
} from "../controllers/categoryController";

const router = Router();

router.route("/").get(getAllCategories).post(createCategory);
router
  .route("/:categoryId")
  .get(getCategory)
  .patch(updateCateogry)
  .delete(deleteCategory);

export default router;
