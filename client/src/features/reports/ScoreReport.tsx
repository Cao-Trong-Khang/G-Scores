import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { getScoreLevelReport } from '../../api/reports.api'
import type { ScoreLevelReport, SubjectKey } from './report.types'

type SubjectOption = {
  key: SubjectKey
  label: string
}

type ChartData = {
  name: string
  count: number
}

const subjectOptions: SubjectOption[] = [
  { key: 'math', label: 'Toán' },
  { key: 'literature', label: 'Ngữ văn' },
  { key: 'foreignLanguage', label: 'Ngoại ngữ' },
  { key: 'physics', label: 'Vật lí' },
  { key: 'chemistry', label: 'Hóa học' },
  { key: 'biology', label: 'Sinh học' },
  { key: 'history', label: 'Lịch sử' },
  { key: 'geography', label: 'Địa lí' },
  { key: 'civicEducation', label: 'Giáo dục công dân' },
]

const scoreLevelLabels: Record<string, string> = {
  greaterThanOrEqual8: '>= 8',
  from6ToUnder8: '6 - dưới 8',
  from4ToUnder6: '4 - dưới 6',
  under4: 'Dưới 4',
}

function toChartData(report: ScoreLevelReport): ChartData[] {
  return report.levels.map((level) => ({
    name: scoreLevelLabels[level.key] ?? level.key,
    count: level.count,
  }))
}

function getErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return 'Không thể tải dữ liệu thống kê. Vui lòng thử lại'
  }

  return error.message || 'Không thể tải dữ liệu thống kê. Vui lòng thử lại'
}

export function ScoreReport() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectKey>('math')
  const [report, setReport] = useState<ScoreLevelReport | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let shouldIgnore = false

    async function fetchReport() {
      setIsLoading(true)
      setError('')
      setReport(null)

      try {
        const scoreLevelReport = await getScoreLevelReport(selectedSubject)

        if (!shouldIgnore) {
          setReport(scoreLevelReport)
        }
      } catch (fetchError) {
        if (!shouldIgnore) {
          setError(getErrorMessage(fetchError))
        }
      } finally {
        if (!shouldIgnore) {
          setIsLoading(false)
        }
      }
    }

    void fetchReport()

    return () => {
      shouldIgnore = true
    }
  }, [selectedSubject])

  const chartData = report ? toChartData(report) : []

  return (
    <section className="rounded-sm border border-slate-300 bg-white p-5">
      <div className="grid gap-2 sm:max-w-xs">
        <label
          className="text-sm font-medium text-slate-700"
          htmlFor="report-subject"
        >
          Môn thi
        </label>

        <select
          className="rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-700"
          id="report-subject"
          onChange={(event) =>
            setSelectedSubject(event.target.value as SubjectKey)
          }
          value={selectedSubject}
        >
          {subjectOptions.map((subject) => (
            <option key={subject.key} value={subject.key}>
              {subject.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        {isLoading && (
          <p className="border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Đang tải dữ liệu thống kê...
          </p>
        )}

        {!isLoading && error && (
          <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {!isLoading && !error && report && chartData.length === 0 && (
          <p className="border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Chưa có dữ liệu thống kê cho môn này.
          </p>
        )}

        {!isLoading && !error && chartData.length > 0 && (
          <div className="h-80 border border-slate-300 p-3">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} />
                <YAxis allowDecimals={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0f172a" name="Số thí sinh" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  )
}
