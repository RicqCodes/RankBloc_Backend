import { Router } from "express";
import { likeEntity } from "../controllers/likeController";

const router = Router();

router.route("/:likeType/:typeId").post(likeEntity);

export default router;
