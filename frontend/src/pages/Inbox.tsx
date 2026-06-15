import { Inbox as InboxIcon, Bell, CheckCircle2, MessageSquare } from 'lucide-react'

export function Inbox() {
  const notifications = [
    { id: 1, title: 'New task assigned to you', desc: 'Design System Phase 2', time: '10m ago', icon: <Bell className="text-blue-400 w-4 h-4" /> },
    { id: 2, title: 'Comment on PR', desc: 'Sujith replied to your comment on "Fix Auth Bug"', time: '1h ago', icon: <MessageSquare className="text-purple-400 w-4 h-4" /> },
    { id: 3, title: 'Task Completed', desc: 'Landing Page animations are now live', time: '2h ago', icon: <CheckCircle2 className="text-green-400 w-4 h-4" /> },
  ]

  return (
    <div className="flex h-full w-full">
      {/* List Pane */}
      <div className="w-1/3 border-r border-white/10 flex flex-col h-full bg-background/50">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="font-semibold flex items-center gap-2"><InboxIcon className="w-5 h-5" /> Inbox</h2>
          <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">3 Unread</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notifications.map(n => (
            <div key={n.id} className="p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  {n.icon}
                  <h4 className="text-sm font-medium text-gray-200">{n.title}</h4>
                </div>
                <span className="text-xs text-gray-500">{n.time}</span>
              </div>
              <p className="text-sm text-gray-500 ml-6">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Detail Pane */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10 shadow-xl">
          <InboxIcon className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">You're all caught up!</h3>
        <p className="text-gray-500 max-w-sm">
          Select a notification on the left to view its details, or take a deep breath and enjoy the silence.
        </p>
      </div>
    </div>
  )
}
