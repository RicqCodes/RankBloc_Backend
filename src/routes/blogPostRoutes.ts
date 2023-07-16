import { Router } from "express";

import {
  getAllBlogPost,
  createBlogPost,
  getBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogPostController";

const router = Router();

router.route("/").get(getAllBlogPost).post(createBlogPost);
router
  .route("/:blogId")
  .get(getBlogPost)
  .patch(updateBlogPost)
  .delete(deleteBlogPost);

export default router;
