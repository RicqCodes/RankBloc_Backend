import { Router } from "express";
import {
  createBadge,
  deleteBadge,
  getAllBadges,
  getBadge,
  updateBadge,
} from "../controllers/badgeController";
import { checkAdminRole } from "../middlewares/checkAdminRole";
import verifySignedMessage from "../middlewares/verifySignedMessage";

const router = Router();

router
  .route("/")
  .get(getAllBadges)
  .post(verifySignedMessage, checkAdminRole, createBadge);
router.route("/:badgeId").get(getBadge).patch(updateBadge).delete(deleteBadge);

export default router;
