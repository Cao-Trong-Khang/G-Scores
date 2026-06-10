export type SubjectKey =
  | 'math'
  | 'literature'
  | 'foreignLanguage'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'history'
  | 'geography'
  | 'civicEducation'

export type ScoreLevel = {
  key: string
  count: number
}

export type ScoreLevelReport = {
  subject: SubjectKey
  levels: ScoreLevel[]
}
