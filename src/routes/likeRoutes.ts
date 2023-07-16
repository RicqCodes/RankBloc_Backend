import { Router } from "express";
import { getLikes, like, unlike } from "../controllers/likeController";

const router = Router();

router.route("/:likeType/:typeId").get(getLikes).post(like).delete(unlike);
