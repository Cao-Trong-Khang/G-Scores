import { useState, type SubmitEvent } from 'react'
import { getScoreByRegistrationNumber } from '../../api/scores.api'
import type { Score } from './score.types'

type SubjectScore = {
  label: string
  value: number | null
}

function getSubjectScores(score: Score): SubjectScore[] {
  return [
    { label: 'Toán', value: score.math },
    { label: 'Ngữ văn', value: score.literature },
    { label: 'Ngoại ngữ', value: score.foreignLanguage },
    { label: 'Vật lí', value: score.physics },
    { label: 'Hóa học', value: score.chemistry },
    { label: 'Sinh học', value: score.biology },
    { label: 'Lịch sử', value: score.history },
    { label: 'Địa lí', value: score.geography },
    { label: 'Giáo dục công dân', value: score.civicEducation },
  ].filter((subject) => subject.value !== null)
}

const errorMessages: Record<string, string> = {
  'Registration number is required': 'Vui lòng nhập số báo danh',
  'Registration number must contain digits only':
    'Số báo danh chỉ được chứa chữ số',
  'Score not found': 'Không tìm thấy điểm cho số báo danh này',
  'Internal server error': 'Lỗi máy chủ. Vui lòng thử lại sau',
  'Request failed': 'Không thể tra cứu điểm. Vui lòng thử lại',
}

function getErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return 'Không thể tra cứu điểm. Vui lòng thử lại'
  }

  return errorMessages[error.message] ?? 'Không thể tra cứu điểm. Vui lòng thử lại'
}

export function ScoreSearch() {
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [score, setScore] = useState<Score | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedRegistrationNumber = registrationNumber.trim()
    setHasSearched(true)
    setError('')

    if (!normalizedRegistrationNumber) {
      setScore(null)
      setError('Vui lòng nhập số báo danh')
      return
    }

    if (!/^\d+$/.test(normalizedRegistrationNumber)) {
      setScore(null)
      setError('Số báo danh chỉ được chứa chữ số')
      return
    }

    setIsLoading(true)
    setScore(null)

    try {
      const foundScore = await getScoreByRegistrationNumber(
        normalizedRegistrationNumber,
      )

      setScore(foundScore)
    } catch (searchError) {
      setError(getErrorMessage(searchError))
    } finally {
      setIsLoading(false)
    }
  }

  const subjectScores = score ? getSubjectScores(score) : []

  return (
    <section className="rounded-sm border border-slate-300 bg-white p-5">

      <form className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
        <label className="grid gap-1 text-sm font-medium text-slate-700">
          Số báo danh
          <input
            className="rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-700"
            inputMode="numeric"
            onChange={(event) => setRegistrationNumber(event.target.value)}
            placeholder="Nhập số báo danh"
            type="text"
            value={registrationNumber}
          />
        </label>

        <button
          className="rounded-sm bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:self-end"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
        </button>
      </form>

      <div className="mt-5">
        {isLoading && (
          <p className="border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Đang tra cứu điểm...
          </p>
        )}

        {!isLoading && error && (
          <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {!isLoading && !error && score && (
          <div className="grid gap-5">
            <div className="border border-slate-300 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Thông tin thí sinh
              </h3>
              <dl className="mt-3 grid gap-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Số báo danh</dt>
                  <dd className="font-medium text-slate-950">
                    {score.registrationNumber}
                  </dd>
                </div>

                {score.foreignLanguageCode !== null && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Mã ngoại ngữ</dt>
                    <dd className="font-medium text-slate-950">
                      {score.foreignLanguageCode}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="overflow-x-auto border border-slate-300">
              <table className="min-w-full border-collapse text-sm">
                <thead className="bg-slate-100 text-left text-slate-600">
                  <tr>
                    <th className="border-b border-slate-300 px-3 py-2 font-semibold">
                      Môn thi
                    </th>
                    <th className="border-b border-slate-300 px-3 py-2 font-semibold">
                      Điểm
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subjectScores.map((subject) => (
                    <tr className="border-b border-slate-200 last:border-b-0" key={subject.label}>
                      <td className="px-3 py-2 text-slate-600">{subject.label}</td>
                      <td className="px-3 py-2 font-medium text-slate-950">
                        {subject.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!isLoading && !error && !score && !hasSearched && (
          <p className="border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Nhập số báo danh để xem điểm thi của thí sinh.
          </p>
        )}
      </div>
    </section>
  )
}
