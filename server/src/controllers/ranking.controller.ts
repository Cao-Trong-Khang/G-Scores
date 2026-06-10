import type { Request, Response } from "express";
import { rankingService } from "../services/ranking.service";

export class RankingController {
  getTopGroupA = async (_request: Request, response: Response): Promise<void> => {
    try {
      const ranking = await rankingService.getTopGroupA();

      response.status(200).json(ranking);
    } catch (error) {
      console.error("Failed to get group A top ranking:", error);
      response.status(500).json({
        message: "Internal server error",
      });
    }
  };
}

export const rankingController = new RankingController();
