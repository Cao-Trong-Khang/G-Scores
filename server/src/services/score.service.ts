import { prisma } from "../lib/prisma";
import type { ScoreResponse } from "../types/score.types";

export class ScoreService {
  async findByRegistrationNumber(registrationNumber: string): Promise<ScoreResponse | null> {
    const normalizedRegistrationNumber = registrationNumber.trim();

    const score = await prisma.examScore.findUnique({
      where: {
        registrationNumber: normalizedRegistrationNumber,
      },
    });

    if (!score) {
      return null;
    }

    return {
      registrationNumber: score.registrationNumber,
      math: score.math,
      literature: score.literature,
      foreignLanguage: score.foreignLanguage,
      physics: score.physics,
      chemistry: score.chemistry,
      biology: score.biology,
      history: score.history,
      geography: score.geography,
      civicEducation: score.civicEducation,
      foreignLanguageCode: score.foreignLanguageCode,
    };
  }
}

export const scoreService = new ScoreService();
