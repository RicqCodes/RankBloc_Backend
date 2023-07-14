import { Router } from "express";

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import checkID from "../middlewares/checkID";

const router = Router();

router.param("id", checkID);

router.route("/api/v1/users").get(getAllUsers).post(createUser);

router
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
