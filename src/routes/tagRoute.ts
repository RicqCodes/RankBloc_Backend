import { Router } from "express";
import { createTag, getAllTags } from "../controllers/tagController";

const router = Router();

router.route("/").get(getAllTags).post(createTag);

export default router;
