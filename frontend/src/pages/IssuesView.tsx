import React, { useState, useEffect } from 'react'
import { Plus, Sparkles, X, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { io } from 'socket.io-client'

type Priority = 'High' | 'Medium' | 'Low'
type Status = 'Todo' | 'In Progress' | 'Done'

interface Task {
  id: string
  title: string
  priority: Priority
  date: string
  status: Status
}

const socket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000')

export function IssuesView() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notes, setNotes] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Fetch initial tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const workspaceId = localStorage.getItem('workspaceId')
        if (!workspaceId) return
        
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        const res = await axios.get(`${apiUrl}/tasks?workspaceId=${workspaceId}`)
        setTasks(res.data)
      } catch (err) {
        console.error("Failed to fetch tasks", err)
      }
    }
    fetchTasks()

    // Listen for real-time updates
    socket.on('taskUpdated', (updatedTask: Task) => {
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t))
    })

    socket.on('taskCreated', (newTask: Task) => {
      setTasks(prev => [...prev, newTask])
    })

    return () => {
      socket.off('taskUpdated')
      socket.off('taskCreated')
    }
  }, [])

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedTaskId(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e: React.DragEvent, newStatus: Status) => {
    e.preventDefault()
    if (!draggedTaskId) return

    // Optimistic UI update
    const taskToUpdate = tasks.find(t => t.id === draggedTaskId)
    if (!taskToUpdate || taskToUpdate.status === newStatus) {
      setDraggedTaskId(null)
      return
    }

    const updatedTask = { ...taskToUpdate, status: newStatus }
    
    setTasks(prev => prev.map(task => 
      task.id === draggedTaskId ? updatedTask : task
    ))
    setDraggedTaskId(null)

    // Emit to other clients instantly
    socket.emit('taskMoved', updatedTask)

    // Save to database
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      await axios.put(`${apiUrl}/tasks/${draggedTaskId}`, { status: newStatus })
    } catch (err) {
      console.error("Failed to update task", err)
      // Revert optimistic update on failure (optional)
    }
  }

  const handleGenerateTasks = async () => {
    if (!notes.trim()) return
    setIsGenerating(true)
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const workspaceId = localStorage.getItem('workspaceId')
      
      const res = await axios.post(`${apiUrl}/ai/generate-tasks-from-notes`, { notes })
      const newTasksData = res.data.tasks.map((t: any) => ({ ...t, workspaceId }))

      // Save all generated tasks to DB
      const createdTasks = await Promise.all(
        newTasksData.map((taskData: any) => 
          axios.post(`${apiUrl}/tasks`, taskData).then(r => r.data)
        )
      )

      setTasks(prev => [...prev, ...createdTasks])
      createdTasks.forEach(task => socket.emit('taskCreated', task))
      
      setIsModalOpen(false)
      setNotes('')
    } catch (err) {
      console.error("Generation failed", err)
      alert("Failed to generate tasks via AI.")
    } finally {
      setIsGenerating(false)
    }
  }

  const columns: { title: Status, color: string, icon: React.ReactNode }[] = [
    { 
      title: 'Todo', 
      color: 'bg-gray-500',
      icon: <div className="w-3 h-3 rounded-full bg-gray-500"></div>
    },
    { 
      title: 'In Progress', 
      color: 'bg-blue-500',
      icon: <div className="w-3 h-3 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
    },
    { 
      title: 'Done', 
      color: 'bg-green-500',
      icon: <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-black rounded-full"></div></div>
    }
  ]

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 w-full h-full relative">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-tight">My Issues</h1>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-4 h-4" /> AI Meeting Notes
            </button>
            <button className="bg-white text-black px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors">
              <Plus className="w-4 h-4" /> New Issue
            </button>
          </div>
        </div>

        {/* Kanban Board Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => {
            const columnTasks = tasks.filter(t => t.status === column.title)
            
            return (
              <div 
                key={column.title}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.title)}
                className="bg-white/[0.02] border border-white/5 rounded-xl p-4 min-h-[500px]"
              >
                <div className="flex items-center gap-2 mb-4">
                  {column.icon}
                  <h3 className="font-medium text-sm text-gray-400">
                    {column.title} <span className="ml-2 text-gray-600">{columnTasks.length}</span>
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <AnimatePresence>
                    {columnTasks.map(task => (
                      <motion.div 
                        layout
                        layoutId={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        key={task.id} 
                        draggable
                        onDragStart={(e: any) => handleDragStart(e, task.id)}
                        onDragEnd={() => setDraggedTaskId(null)}
                        className={`group flex flex-col gap-3 p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-grab active:cursor-grabbing ${draggedTaskId === task.id ? 'opacity-50 ring-2 ring-blue-500' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-gray-500">{task.id.slice(-6)}</span>
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-200 leading-snug">{task.title}</span>
                        
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mt-1">
                          <span className={
                            task.priority === 'High' ? 'text-red-400' : 
                            task.priority === 'Medium' ? 'text-yellow-400' : 'text-blue-400'
                          }>{task.priority}</span>
                          <span>{task.date}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {columnTasks.length === 0 && (
                    <div className="h-24 rounded-lg border border-dashed border-white/10 flex items-center justify-center text-sm text-gray-600">
                      Drop tasks here
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* AI Meeting Notes Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-gray-900 border border-white/10 p-6 rounded-2xl shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold">Generate Tasks from Notes</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-gray-400 mb-4">Paste your meeting transcript or rough notes below. Our Gemini AI engine will parse the text and automatically populate your Kanban board with actionable tasks.</p>

              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., In today's standup, Sarah mentioned we need to fix the login bug immediately. John will handle updating the marketing copy by tomorrow..."
                className="w-full h-48 bg-black/50 border border-white/10 rounded-lg p-4 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none mb-4"
              />

              <div className="flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={handleGenerateTasks}
                  disabled={isGenerating || !notes.trim()}
                  className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-white"
                >
                  {isGenerating ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Generate Tasks</>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
