import { useEffect, useState } from 'react'
import { getGroupATopRanking } from '../../api/rankings.api'
import type { GroupATopRanking as GroupATopRankingData } from './ranking.types'

const errorMessages: Record<string, string> = {
  'Internal server error': 'Lỗi máy chủ. Vui lòng thử lại sau',
  'Request failed': 'Không thể tải bảng xếp hạng. Vui lòng thử lại',
}

function getErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return 'Không thể tải bảng xếp hạng. Vui lòng thử lại'
  }

  return (
    errorMessages[error.message] ??
    'Không thể tải bảng xếp hạng. Vui lòng thử lại'
  )
}

export function GroupATopRanking() {
  const [ranking, setRanking] = useState<GroupATopRankingData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let shouldIgnore = false

    async function fetchRanking() {
      setIsLoading(true)
      setError('')
      setRanking(null)

      try {
        const groupATopRanking = await getGroupATopRanking()

        if (!shouldIgnore) {
          setRanking(groupATopRanking)
        }
      } catch (rankingError) {
        if (!shouldIgnore) {
          setError(getErrorMessage(rankingError))
        }
      } finally {
        if (!shouldIgnore) {
          setIsLoading(false)
        }
      }
    }

    void fetchRanking()

    return () => {
      shouldIgnore = true
    }
  }, [])

  const items = ranking?.items ?? []

  return (
    <section className="rounded-sm border border-slate-300 bg-white p-5">

      <div className="mt-5">
        {isLoading && (
          <p className="border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Đang tải bảng xếp hạng...
          </p>
        )}

        {!isLoading && error && (
          <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {!isLoading && !error && items.length === 0 && (
          <p className="border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Chưa có dữ liệu xếp hạng khối A.
          </p>
        )}

        {!isLoading && !error && items.length > 0 && (
          <div className="overflow-x-auto border border-slate-300">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-slate-100 text-left text-slate-600">
                <tr>
                  <th className="border-b border-slate-300 px-3 py-2 font-semibold">
                    Hạng
                  </th>
                  <th className="border-b border-slate-300 px-3 py-2 font-semibold">
                    Số báo danh
                  </th>
                  <th className="border-b border-slate-300 px-3 py-2 font-semibold">
                    Toán
                  </th>
                  <th className="border-b border-slate-300 px-3 py-2 font-semibold">
                    Vật lí
                  </th>
                  <th className="border-b border-slate-300 px-3 py-2 font-semibold">
                    Hóa học
                  </th>
                  <th className="border-b border-slate-300 px-3 py-2 font-semibold">
                    Tổng điểm
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr
                    className="border-b border-slate-200 last:border-b-0"
                    key={item.registrationNumber}
                  >
                    <td className="px-3 py-2 font-medium text-slate-950">
                      {item.rank}
                    </td>
                    <td className="px-3 py-2 text-slate-600">
                      {item.registrationNumber}
                    </td>
                    <td className="px-3 py-2 text-slate-600">{item.math}</td>
                    <td className="px-3 py-2 text-slate-600">
                      {item.physics}
                    </td>
                    <td className="px-3 py-2 text-slate-600">
                      {item.chemistry}
                    </td>
                    <td className="px-3 py-2 font-semibold text-slate-950">
                      {item.totalScore}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
