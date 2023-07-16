import { Router } from "express";
import {
  createBadge,
  deleteBadge,
  getAllBadges,
  getBadge,
  updateBadge,
} from "../controllers/badgeController";

const router = Router();

router.route("/").get(getAllBadges).post(createBadge);
router.route("/:badgeId").get(getBadge).patch(updateBadge).delete(deleteBadge);

export default router;
