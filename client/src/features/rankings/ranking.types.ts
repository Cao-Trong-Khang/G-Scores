import type { SubjectKey } from '../reports/report.types'

export type GroupARankingItem = {
  rank: number
  registrationNumber: string
  math: number
  physics: number
  chemistry: number
  totalScore: number
}

export type GroupATopRanking = {
  group: 'A'
  subjects: SubjectKey[]
  items: GroupARankingItem[]
}
