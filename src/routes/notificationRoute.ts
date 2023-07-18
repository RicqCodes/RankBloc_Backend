import { Router } from "express";
import {
  createNotification,
  deleteNotification,
  getAllNotifications,
  getNotification,
  updateNotification,
} from "../controllers/notificationController";

const router = Router();

router.route("/").get(getAllNotifications).post(createNotification);

router
  .route("/:notificationId")
  .get(getNotification)
  .patch(updateNotification)
  .delete(deleteNotification);

export default router;
