import type { SubjectKey } from "./subject.types";

export type GroupARankingItem = {
  rank: number;
  registrationNumber: string;
  math: number;
  physics: number;
  chemistry: number;
  totalScore: number;
};

export type GroupATopRankingResponse = {
  group: "A";
  subjects: SubjectKey[];
  items: GroupARankingItem[];
};
