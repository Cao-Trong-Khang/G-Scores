import { request } from './client'
import type { Score } from '../features/scores/score.types'

export function getScoreByRegistrationNumber(registrationNumber: string) {
  const encodedRegistrationNumber = encodeURIComponent(registrationNumber)

  return request<Score>(`/scores/${encodedRegistrationNumber}`)
}
