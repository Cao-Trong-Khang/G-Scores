import type { MenuKey } from '../pages/DashboardPage'

type MenuItem = {
  key: MenuKey
  label: string
}

const menuItems: MenuItem[] = [
  { key: 'scores', label: 'Search Scores' },
  { key: 'reports', label: 'Report' },
  { key: 'rankings', label: 'Top' },
]

type SidebarProps = {
  activeMenu: MenuKey
  onMenuChange: (menu: MenuKey) => void
}

export function Sidebar({ activeMenu, onMenuChange }: SidebarProps) {
  return (
    <aside className="border-b border-slate-800 bg-slate-900 px-4 py-4 text-slate-100 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:px-5">
      <div className="mb-4 md:mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
          G-Score
        </p>
        <p className="text-sm text-slate-400">Exam dashboard</p>
      </div>

      <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {menuItems.map((item) => {
          const isActive = item.key === activeMenu

          return (
            <button
              className={`rounded-sm border-l-2 px-3 py-2 text-left text-sm font-medium transition ${
                isActive
                  ? 'border-cyan-300 bg-slate-800 text-white'
                  : 'border-transparent text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              key={item.key}
              onClick={() => onMenuChange(item.key)}
              type="button"
            >
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
