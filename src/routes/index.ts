import { Router } from "express";

import userRoute from "./userRoute";
import blogPostRoute from "./blogPostRoute";
import categoryRoute from "./categoryRoute";
import badgeRoute from "./badgeRoute";
import commentRoute from "./commentRoute";
import likeRoute from "./likeRoute";
import notificationRoute from "./notificationRoute";
import sharesRoute from "./sharesRoute";
import tagRoute from "./tagRoute";
import userRelationRoute from "./userRelationshipRoute";
import miscellaneousRoute from "./miscellaneousRoute";
import authRoute from "./authRoute";

const router = Router();

router.use("/authentication", authRoute);
router.use("/users", userRoute);
router.use("/user-relationships", userRelationRoute);
router.use("/blog-posts", blogPostRoute);
router.use("/categories", categoryRoute);
router.use("/badges", badgeRoute);
router.use("/comments", commentRoute);
router.use("/likes", likeRoute);
router.use("/notifications", notificationRoute);
router.use("/shares", sharesRoute);
router.use("/tags", tagRoute);
router.use("/miscellaneous", miscellaneousRoute);
export default router;
