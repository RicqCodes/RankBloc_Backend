import { Router } from "express";

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getNonce,
} from "../controllers/userController";
import checkID from "../middlewares/checkID";
import verifySignedMessage from "../middlewares/verifySignedMessage";

const router = Router();

router.param("id", checkID);

router.route("/").post(createUser).get(getAllUsers);
router.route("/getNonce").get(getNonce);
router.route("/getUser").get(verifySignedMessage, getUser);
router.route("/:id").patch(updateUser).delete(deleteUser);

export default router;
