import React, { useState, useEffect } from 'react'
import { FileText, Plus, ArrowLeft, Save } from 'lucide-react'
import axios from 'axios'

interface Document {
  id: string
  title: string
  content: string
  type: string
  updatedAt: string
}

export function Documents() {
  const [docs, setDocs] = useState<Document[]>([])
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  
  // Form State
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    fetchDocs()
  }, [])

  const fetchDocs = async () => {
    try {
      const workspaceId = localStorage.getItem('workspaceId')
      if (!workspaceId) return
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const res = await axios.get(`${apiUrl}/documents?workspaceId=${workspaceId}`)
      setDocs(res.data)
    } catch (error) {
      console.error('Failed to fetch documents', error)
    }
  }

  const handleSave = async () => {
    try {
      const workspaceId = localStorage.getItem('workspaceId')
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      
      if (viewingDoc && viewingDoc.id) {
        // Update
        const res = await axios.put(`${apiUrl}/documents/${viewingDoc.id}`, { title, content })
        setDocs(docs.map(d => d.id === viewingDoc.id ? res.data : d))
        setViewingDoc(res.data)
      } else {
        // Create
        const res = await axios.post(`${apiUrl}/documents`, { title, content, type: 'Notes', workspaceId })
        setDocs([res.data, ...docs])
        setViewingDoc(res.data)
      }
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to save document', error)
    }
  }

  const openNewDoc = () => {
    setViewingDoc({ id: '', title: 'Untitled Document', content: '', type: 'Notes', updatedAt: '' })
    setTitle('')
    setContent('')
    setIsEditing(true)
  }

  const openDoc = (doc: Document) => {
    setViewingDoc(doc)
    setTitle(doc.title)
    setContent(doc.content)
    setIsEditing(false)
  }

  if (viewingDoc) {
    return (
      <div className="flex flex-col h-full w-full bg-background relative animate-in fade-in duration-300">
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 shrink-0 bg-white/5 backdrop-blur-xl">
          <button onClick={() => setViewingDoc(null)} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> Back to Documents
          </button>
          
          <div className="flex gap-3">
            {isEditing ? (
              <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-medium transition flex items-center gap-2">
                <Save className="w-4 h-4" /> Save
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded text-sm font-medium transition">
                Edit Document
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-12 flex justify-center">
          <div className="w-full max-w-3xl">
            {isEditing ? (
              <>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Document Title" 
                  className="w-full text-4xl font-bold bg-transparent text-white focus:outline-none mb-8 placeholder:text-gray-700" 
                />
                <textarea 
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Start writing..." 
                  className="w-full h-[60vh] bg-transparent text-gray-300 focus:outline-none resize-none leading-relaxed text-lg placeholder:text-gray-700"
                />
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-white mb-8">{viewingDoc.title}</h1>
                <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                  {viewingDoc.content || <span className="text-gray-600 italic">Empty document.</span>}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 w-full h-full overflow-y-auto">
      <div className="flex justify-between items-end mb-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold mb-1">Documents</h1>
          <p className="text-gray-400">Team wikis, notes, and strategy documents.</p>
        </div>
        <button onClick={openNewDoc} className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4" /> New Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {docs.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-white/20 rounded-xl bg-white/5">
            <FileText className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No documents yet. Create your first wiki!</p>
          </div>
        )}
        {docs.map((doc) => (
          <div key={doc.id} onClick={() => openDoc(doc)} className="group p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg hover:-translate-y-1">
            <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-200 mb-1 truncate">{doc.title}</h3>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
              <span>{new Date(doc.updatedAt).toLocaleDateString()}</span>
              <span className="bg-white/5 px-2 py-1 rounded">{doc.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
