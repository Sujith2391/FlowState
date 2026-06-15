import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { AIAssistant } from '../components/ui/ai-assistant'
import { Bell, Search } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

export function Dashboard() {
  const [activeWorkspace, setActiveWorkspace] = useState<{ id: string, name: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initWorkspace = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        let res = await axios.get(`${apiUrl}/workspaces`)
        let workspaces = res.data
        
        if (workspaces.length === 0) {
          // Auto-create a default workspace for new users
          const createRes = await axios.post(`${apiUrl}/workspaces`, { name: "Personal Workspace" })
          workspaces = [createRes.data]
        }
        
        setActiveWorkspace(workspaces[0])
        localStorage.setItem('workspaceId', workspaces[0].id)
      } catch (err) {
        console.error("Failed to load workspace", err)
      } finally {
        setIsLoading(false)
      }
    }
    initWorkspace()
  }, [])

  if (isLoading) {
    return <div className="flex h-screen bg-black items-center justify-center text-white">Loading Workspace...</div>
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      <Sidebar activeWorkspaceName={activeWorkspace?.name || "FlowState Team"} />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Dashboard Header */}
        <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 shrink-0 bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search anything (Cmd+K)" 
                className="w-full bg-white/5 border border-white/10 rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border border-white/20"></div>
          </div>
        </header>

        {/* Dynamic Nested Route Content */}
        <div className="flex-1 overflow-y-hidden">
          <Outlet />
        </div>

        <AIAssistant />
      </main>
    </div>
  )
}
