import React, { useState } from 'react'
import { Sparkles, X, Send, User } from 'lucide-react'
import axios from 'axios'

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: "Hi! I'm FlowState AI. I can help you prioritize tasks, summarize project docs, or generate a roadmap. What do you need?" }
  ])

  const handleSend = async () => {
    if (!input.trim()) return
    
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    setIsLoading(true)
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${apiUrl}/ai/chat`, { prompt: userMessage });
      
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: response.data.reply 
      }])
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "I'm having trouble connecting to the network right now. Please try again later." 
      }])
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black shadow-lg shadow-white/10 flex items-center justify-center hover:scale-105 transition-transform z-50 group"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] h-[600px] rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-white/5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gray-300" />
              <span className="font-semibold text-sm">FlowState Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-gray-800' : 'bg-gradient-to-tr from-gray-200 to-gray-600 text-black'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>
                <div className={`px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                    : 'bg-white/10 text-gray-200 rounded-tl-sm border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.03)]'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-tr from-gray-200 to-gray-600 text-black">
                   <Sparkles className="w-4 h-4 animate-pulse" />
                 </div>
                 <div className="px-4 py-2.5 rounded-2xl text-sm bg-white/10 text-gray-200 rounded-tl-sm border border-white/5 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                 </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-black/50">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
                placeholder="Ask AI anything..." 
                className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-200 disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-2 rounded-full bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mt-3">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold">Gemini API Powered</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
