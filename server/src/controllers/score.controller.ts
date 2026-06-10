import type { Request, Response } from "express";
import { scoreService } from "../services/score.service";

export class ScoreController {
  getByRegistrationNumber = async (request: Request, response: Response): Promise<void> => {
    const registrationNumberParam = request.params.registrationNumber;
    const registrationNumber = Array.isArray(registrationNumberParam)
      ? registrationNumberParam[0]?.trim()
      : registrationNumberParam?.trim();

    if (!registrationNumber) {
      response.status(400).json({
        message: "Registration number is required",
      });
      return;
    }

    if (!/^\d+$/.test(registrationNumber)) {
      response.status(400).json({
        message: "Registration number must contain digits only",
      });
      return;
    }

    try {
      const score = await scoreService.findByRegistrationNumber(registrationNumber);

      if (!score) {
        response.status(404).json({
          message: "Score not found",
        });
        return;
      }

      response.status(200).json(score);
    } catch (error) {
      console.error("Failed to get score by registration number:", error);
      response.status(500).json({
        message: "Internal server error",
      });
    }
  };
}

export const scoreController = new ScoreController();
