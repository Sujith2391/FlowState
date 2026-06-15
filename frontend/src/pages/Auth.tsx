import React, { useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export function Auth({ mode }: { mode: 'login' | 'register' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register'
      
      const payload = mode === 'register' ? { name, email, password } : { email, password }
      
      const res = await axios.post(`${apiUrl}${endpoint}`, payload)
      localStorage.setItem('token', res.data.token)
      // Small delay for premium feel
      setTimeout(() => {
        navigate('/dashboard')
      }, 600)
    } catch (error) {
      console.error(error)
      alert("Authentication failed. Make sure your MongoDB and backend are running!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 hover:opacity-80 transition-opacity z-20">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-gray-200 to-gray-600 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-black" />
        </div>
        <span className="font-bold text-lg tracking-tight text-white">FlowState AI</span>
      </Link>

      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {mode === 'login' ? 'Welcome back' : 'Create your workspace'}
          </h2>
          <p className="text-gray-400 text-sm">
            {mode === 'login' ? 'Enter your details to access your projects.' : 'Join the future of AI-powered productivity.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase mb-1.5">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase mb-1.5">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase mb-1.5">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white text-black font-semibold rounded-lg px-4 py-3 text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2 mt-8 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : 'Continue'} <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          {mode === 'login' ? (
            <>Don't have an account? <Link to="/register" className="text-white hover:text-blue-400 transition-colors font-medium ml-1">Sign up</Link></>
          ) : (
            <>Already have an account? <Link to="/login" className="text-white hover:text-blue-400 transition-colors font-medium ml-1">Sign in</Link></>
          )}
        </div>
      </div>
    </div>
  )
}
