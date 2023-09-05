import { Router } from "express";
import { authenticate } from "../controllers/AuthController";

const router = Router();

router.route("/").post(authenticate);

export default router;
