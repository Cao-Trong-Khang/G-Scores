import { request } from './client'
import type {
  ScoreLevelReport,
  SubjectKey,
} from '../features/reports/report.types'

export function getScoreLevelReport(subjectKey: SubjectKey) {
  const encodedSubjectKey = encodeURIComponent(subjectKey)

  return request<ScoreLevelReport>(
    `/reports/score-levels?subject=${encodedSubjectKey}`,
  )
}
