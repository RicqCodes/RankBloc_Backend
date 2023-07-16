import { Router } from "express";
import { createShare, getAllShares } from "../controllers/shareController";

const router = Router();

router.route("/").get(getAllShares).post(createShare);
