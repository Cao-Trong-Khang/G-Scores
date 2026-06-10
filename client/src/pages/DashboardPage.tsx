import { useState } from 'react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { GroupATopRanking } from '../features/rankings/GroupATopRanking'
import { ScoreReport } from '../features/reports/ScoreReport'
import { ScoreSearch } from '../features/scores/ScoreSearch'

export type MenuKey = 'scores' | 'reports' | 'rankings'

const pageContent: Record<MenuKey, { title: string; description: string }> = {
  scores: {
    title: 'Search Scores',
    description: 'Tra cứu điểm thi theo số báo danh.',
  },
  reports: {
    title: 'Report',
    description: 'Thống kê số lượng thí sinh theo 4 mức điểm.',
  },
  rankings: {
    title: 'Top',
    description: 'Top 10 thí sinh khối A theo tổng Toán, Lý, Hóa.',
  },
}

function renderActiveContent(activeMenu: MenuKey) {
  if (activeMenu === 'reports') {
    return <ScoreReport />
  }

  if (activeMenu === 'rankings') {
    return <GroupATopRanking />
  }

  return <ScoreSearch />
}

export function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>('scores')
  const activePage = pageContent[activeMenu]

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="md:flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

        <div className="min-w-0 flex-1">
          <Header title={activePage.title} description={activePage.description} />

          <section className="px-5 py-6">
            {renderActiveContent(activeMenu)}
          </section>
        </div>
      </div>
    </main>
  )
}
