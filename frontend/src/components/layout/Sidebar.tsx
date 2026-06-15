import React from 'react'
import { Sparkles, Inbox, FileText, CheckSquare, Settings, Users, Layers, Zap } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function Sidebar({ activeWorkspaceName = "FlowState Team" }: { activeWorkspaceName?: string }) {
  return (
    <aside className="w-64 border-r border-white/10 bg-background/95 backdrop-blur-xl flex flex-col shrink-0">
      {/* Workspace Selector */}
      <div className="h-14 flex items-center px-4 border-b border-white/10 hover:bg-white/5 cursor-pointer transition-colors">
        <div className="w-6 h-6 rounded bg-gradient-to-tr from-gray-200 to-gray-600 flex items-center justify-center mr-3 shrink-0">
          <Sparkles className="w-3 h-3 text-black" />
        </div>
        <span className="font-semibold text-sm truncate">{activeWorkspaceName}</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <NavItem to="/dashboard/inbox" icon={<Inbox />} label="Inbox" badge="3" />
        <NavItem to="/dashboard/issues" icon={<CheckSquare />} label="My Issues" />
        <NavItem to="/dashboard/views" icon={<Layers />} label="Views" />
        
        <div className="mt-6 mb-2 px-2 text-xs font-semibold text-gray-500 tracking-wider">WORKSPACE</div>
        
        <NavItem to="/dashboard/documents" icon={<FileText />} label="Documents" />
        <NavItem to="/dashboard/team" icon={<Users />} label="Team" />
        <NavItem to="/dashboard/analytics" icon={<Zap />} label="Analytics" />
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <NavItem to="/dashboard/settings" icon={<Settings />} label="Settings" />
      </div>
    </aside>
  )
}

function NavItem({ to, icon, label, badge }: { to: string, icon: React.ReactNode, label: string, badge?: string }) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}
    >
      <div className="flex items-center gap-3">
        <span className="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:opacity-70">{icon}</span>
        {label}
      </div>
      {badge && <span className="text-xs bg-white/10 text-gray-300 px-1.5 py-0.5 rounded">{badge}</span>}
    </NavLink>
  )
}
