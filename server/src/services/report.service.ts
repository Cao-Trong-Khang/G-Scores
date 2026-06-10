import { prisma } from "../lib/prisma";
import type { Prisma } from "../generated/prisma/client";
import type { SubjectScoreLevelReport } from "../types/report.types";
import { subjectService } from "./subject.service";

const SCORE_LEVELS: { key: string; filter: Prisma.FloatNullableFilter<"ExamScore"> }[] = [
  {
    key: "greaterThanOrEqual8",
    filter: { gte: 8 },
  },
  {
    key: "from6ToUnder8",
    filter: { gte: 6, lt: 8 },
  },
  {
    key: "from4ToUnder6",
    filter: { gte: 4, lt: 6 },
  },
  {
    key: "under4",
    filter: { lt: 4 },
  },
];

export class ReportService {
  async getScoreLevelReport(subjectKey: string): Promise<SubjectScoreLevelReport | null> {
    if (!subjectService.isValidKey(subjectKey)) {
      return null;
    }

    const levels = await Promise.all(
      SCORE_LEVELS.map(async (level) => ({
        key: level.key,
        count: await prisma.examScore.count({
          where: {
            [subjectKey]: level.filter,
          },
        }),
      })),
    );

    return {
      subject: subjectKey,
      levels,
    };
  }
}

export const reportService = new ReportService();
