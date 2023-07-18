import { Router } from "express";
import {
  createShare,
  getAllShares,
  getSharesForPost,
} from "../controllers/shareController";

const router = Router();

router.route("/").get(getAllShares).post(createShare);

router.route("/:postId").get(getSharesForPost);

export default router;
