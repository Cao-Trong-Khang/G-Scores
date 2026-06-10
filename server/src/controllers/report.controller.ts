import type { Request, Response } from "express";
import { reportService } from "../services/report.service";

export class ReportController {
  getScoreLevels = async (request: Request, response: Response): Promise<void> => {
    const subjectParam = request.query.subject;
    const subject = typeof subjectParam === "string" ? subjectParam.trim() : "";

    if (!subject) {
      response.status(400).json({
        message: "Subject is required",
      });
      return;
    }

    try {
      const report = await reportService.getScoreLevelReport(subject);

      if (!report) {
        response.status(400).json({
          message: "Invalid subject",
        });
        return;
      }

      response.status(200).json(report);
    } catch (error) {
      console.error("Failed to get score level report:", error);
      response.status(500).json({
        message: "Internal server error",
      });
    }
  };
}

export const reportController = new ReportController();
