import { Router } from "express";
import { rankingController } from "../controllers/ranking.controller";

export const rankingRoutes = Router();

rankingRoutes.get("/group-a/top", rankingController.getTopGroupA);
