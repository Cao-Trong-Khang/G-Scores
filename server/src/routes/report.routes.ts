import { Router } from "express";
import { reportController } from "../controllers/report.controller";

export const reportRoutes = Router();

reportRoutes.get("/score-levels", reportController.getScoreLevels);
