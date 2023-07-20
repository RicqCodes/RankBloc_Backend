import { Router } from "express";
import {
  followUser,
  getAllFollowers,
  getAllFollowing,
  unfollow,
  checkFollow,
} from "../controllers/userRelationshipController";

const router = Router();

router.post("/:userId/follow", followUser);
router.delete("/:userId/unfollow", unfollow);
router.get("/:userId/followers", getAllFollowers);
router.get("/:userid/following", getAllFollowing);
router.get("/:userId/check-follow/:otherUserId", checkFollow);

export default router;
