import { Router } from "express";
import {
  createComment,
  getBlogPostComments,
} from "../controllers/commentController";

const router = Router();

router.route("/").post(createComment);
router.route("/:commentId").get(getBlogPostComments);

export default router;
