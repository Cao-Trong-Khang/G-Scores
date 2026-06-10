import { request } from './client'
import type { GroupATopRanking } from '../features/rankings/ranking.types'

export function getGroupATopRanking() {
  return request<GroupATopRanking>('/rankings/group-a/top')
}
