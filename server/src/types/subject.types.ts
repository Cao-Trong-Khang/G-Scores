export type SubjectKey =
  | "math"
  | "literature"
  | "foreignLanguage"
  | "physics"
  | "chemistry"
  | "biology"
  | "history"
  | "geography"
  | "civicEducation";

export type Subject = {
  key: SubjectKey;
  label: string;
};
