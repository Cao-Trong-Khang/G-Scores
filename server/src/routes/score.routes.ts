import { Router } from "express";
import { scoreController } from "../controllers/score.controller";

export const scoreRoutes = Router();

scoreRoutes.get("/:registrationNumber", scoreController.getByRegistrationNumber);
