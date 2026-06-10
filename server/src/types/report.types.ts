import type { SubjectKey } from "./subject.types";

export type ScoreLevel = {
  key: string;
  count: number;
};

export type SubjectScoreLevelReport = {
  subject: SubjectKey;
  levels: ScoreLevel[];
};