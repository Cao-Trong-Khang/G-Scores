import type { SubjectKey } from "../types/subject.types";

const SUBJECT_KEYS: SubjectKey[] = [
  "math",
  "literature",
  "foreignLanguage",
  "physics",
  "chemistry",
  "biology",
  "history",
  "geography",
  "civicEducation",
];

const GROUP_A_SUBJECT_KEYS: SubjectKey[] = ["math", "physics", "chemistry"];

export class SubjectService {
  getAll(): SubjectKey[] {
    return [...SUBJECT_KEYS];
  }

  getGroupA(): SubjectKey[] {
    return [...GROUP_A_SUBJECT_KEYS];
  }

  isValidKey(key: string): key is SubjectKey {
    return SUBJECT_KEYS.includes(key as SubjectKey);
  }
}

export const subjectService = new SubjectService();
