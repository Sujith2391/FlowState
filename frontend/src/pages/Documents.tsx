import { FileText, Plus, MoreHorizontal } from 'lucide-react'

export function Documents() {
  const docs = [
    { title: 'Q3 Product Roadmap', updated: '2 days ago', type: 'Strategy' },
    { title: 'Brand Guidelines 2026', updated: '1 week ago', type: 'Design' },
    { title: 'API Documentation', updated: '3 weeks ago', type: 'Engineering' },
    { title: 'Meeting Notes: Founders', updated: '1 month ago', type: 'Notes' },
  ]

  return (
    <div className="p-8 w-full h-full overflow-y-auto">
      <div className="flex justify-between items-end mb-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold mb-1">Documents</h1>
          <p className="text-gray-400">Team wikis, notes, and strategy documents.</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {docs.map((doc, i) => (
          <div key={i} className="group p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg hover:-translate-y-1">
            <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-200 mb-1">{doc.title}</h3>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
              <span>{doc.updated}</span>
              <span className="bg-white/5 px-2 py-1 rounded">{doc.type}</span>
            </div>
            
            <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-white/10 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
