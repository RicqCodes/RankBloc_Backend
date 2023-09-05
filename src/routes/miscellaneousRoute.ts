import { Router } from "express";
import { getMetadata } from "../controllers/miscellaneous";

const router = Router();

router.get("/metadata", getMetadata);

export default router;
