import { Router } from "express";
import { getMetadata } from "../controllers/miscellanous";

const router = Router();

router.get("/metadata", getMetadata);

export default router;
