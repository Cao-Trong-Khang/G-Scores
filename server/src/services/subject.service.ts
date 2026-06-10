import type { Subject, SubjectKey } from "../types/subject.types";

const SUBJECTS: Subject[] = [
  { key: "math", label: "Toán" },
  { key: "literature", label: "Ngữ văn" },
  { key: "foreignLanguage", label: "Ngoại ngữ" },
  { key: "physics", label: "Vật lí" },
  { key: "chemistry", label: "Hóa học" },
  { key: "biology", label: "Sinh học" },
  { key: "history", label: "Lịch sử" },
  { key: "geography", label: "Địa lí" },
  { key: "civicEducation", label: "GDCD" },
];

const GROUP_A_SUBJECT_KEYS: SubjectKey[] = ["math", "physics", "chemistry"];

export class SubjectService {
  getAll(): Subject[] {
    return [...SUBJECTS];
  }

  getGroupA(): Subject[] {
    return SUBJECTS.filter((subject) => GROUP_A_SUBJECT_KEYS.includes(subject.key));
  }

  isValidKey(key: string): key is SubjectKey {
    return SUBJECTS.some((subject) => subject.key === key);
  }
}

export const subjectService = new SubjectService();
