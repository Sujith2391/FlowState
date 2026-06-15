import { LayoutGrid, List, KanbanSquare, Calendar, Plus } from 'lucide-react'

export function Views() {
  const views = [
    { name: 'Default Board', type: 'Kanban', icon: <KanbanSquare className="w-5 h-5 text-blue-400" /> },
    { name: 'Sprint Backlog', type: 'List', icon: <List className="w-5 h-5 text-purple-400" /> },
    { name: 'Feature Roadmap', type: 'Timeline', icon: <LayoutGrid className="w-5 h-5 text-green-400" /> },
    { name: 'Release Schedule', type: 'Calendar', icon: <Calendar className="w-5 h-5 text-orange-400" /> },
  ]

  return (
    <div className="p-8 w-full h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Custom Views</h1>
            <p className="text-gray-400">Save your favorite filters and layouts.</p>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create View
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {views.map((view, i) => (
            <div key={i} className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center">
                {view.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-200">{view.name}</h3>
                <p className="text-sm text-gray-500">{view.type} View</p>
              </div>
              <button className="ml-auto opacity-0 group-hover:opacity-100 transition px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-xs font-medium">
                Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
