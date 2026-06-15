import React, { useState, useEffect } from 'react'
import { Inbox as InboxIcon, Bell, CheckCircle2, MessageSquare } from 'lucide-react'
import axios from 'axios'

interface Notification {
  id: string
  title: string
  description: string
  isRead: boolean
  createdAt: string
}

export function Inbox() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [selectedNotif, setSelectedNotif] = useState<Notification | null>(null)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const workspaceId = localStorage.getItem('workspaceId')
      if (!workspaceId) return
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const res = await axios.get(`${apiUrl}/notifications?workspaceId=${workspaceId}`)
      setNotifications(res.data)
    } catch (error) {
      console.error('Failed to fetch notifications', error)
    }
  }

  const markAsRead = async (notif: Notification) => {
    setSelectedNotif(notif)
    if (notif.isRead) return

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      await axios.put(`${apiUrl}/notifications/${notif.id}/read`)
      setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n))
    } catch (error) {
      console.error('Failed to mark read', error)
    }
  }

  return (
    <div className="flex h-full w-full">
      {/* List Pane */}
      <div className="w-1/3 border-r border-white/10 flex flex-col h-full bg-background/50">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="font-semibold flex items-center gap-2"><InboxIcon className="w-5 h-5" /> Inbox</h2>
          <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">
            {notifications.filter(n => !n.isRead).length} Unread
          </span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500">No notifications yet. Generating tasks with AI will trigger a notification!</div>
          )}
          {notifications.map(n => (
            <div 
              key={n.id} 
              onClick={() => markAsRead(n)}
              className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${selectedNotif?.id === n.id ? 'bg-white/10' : 'hover:bg-white/5'} ${!n.isRead ? 'border-l-2 border-l-blue-500 bg-blue-500/5' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <Bell className={`w-4 h-4 ${n.isRead ? 'text-gray-500' : 'text-blue-400'}`} />
                  <h4 className={`text-sm ${!n.isRead ? 'font-bold text-white' : 'font-medium text-gray-300'}`}>{n.title}</h4>
                </div>
                <span className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <p className="text-sm text-gray-500 ml-6 truncate">{n.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Detail Pane */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-background">
        {selectedNotif ? (
          <div className="max-w-md text-left w-full animate-in fade-in zoom-in-95 duration-300">
            <div className="mb-6 flex items-center gap-3">
               <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                 <Bell className="w-6 h-6 text-blue-400" />
               </div>
               <div>
                 <h2 className="text-2xl font-bold text-white tracking-tight">{selectedNotif.title}</h2>
                 <p className="text-xs text-gray-500">{new Date(selectedNotif.createdAt).toLocaleString()}</p>
               </div>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-gray-300 leading-relaxed">
              {selectedNotif.description}
            </div>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10 shadow-xl">
              <InboxIcon className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">You're all caught up!</h3>
            <p className="text-gray-500 max-w-sm">
              Select a notification on the left to view its details.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
