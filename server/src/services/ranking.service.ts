import { prisma } from "../lib/prisma";
import type { GroupARankingItem, GroupATopRankingResponse } from "../types/ranking.types";
import { subjectService } from "./subject.service";

type GroupARankingRow = {
  registrationNumber: string;
  math: number;
  physics: number;
  chemistry: number;
  totalScore: number;
};

export class RankingService {
  async getTopGroupA(): Promise<GroupATopRankingResponse> {
    const subjects = subjectService.getGroupA();

    const scores = await prisma.$queryRaw<GroupARankingRow[]>`
      SELECT
        registration_number AS "registrationNumber",
        math,
        physics,
        chemistry,
        ROUND((math + physics + chemistry)::numeric, 2)::float AS "totalScore"
      FROM exam_scores
      WHERE math IS NOT NULL
        AND physics IS NOT NULL
        AND chemistry IS NOT NULL
      ORDER BY "totalScore" DESC, registration_number ASC
      LIMIT 10
    `;

    const items = scores.map<GroupARankingItem>((score, index) => ({
        rank: index + 1,
        ...score,
      }));

    return {
      group: "A",
      subjects,
      items,
    };
  }
}

export const rankingService = new RankingService();
