import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "../controllers/commenetController";

const router = Router();

router.route("/").get(getComments).post(createComment);
router
  .route("/:commentId")
  .get(getComment)
  .patch(updateComment)
  .delete(deleteComment);

export default router;
