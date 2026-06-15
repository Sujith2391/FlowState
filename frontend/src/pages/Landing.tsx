import React from 'react'
import { StoryScroll } from '../components/ui/story-scroll'
import { SpookySmokeAnimation } from '../components/ui/spooky-smoke-animation'
import { ArrowRight, Sparkles, LayoutDashboard, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <SpookySmokeAnimation />
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-gray-200 to-gray-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold text-lg tracking-tight">FlowState AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#product" className="hover:text-white transition-colors">Product</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Log in</button>
            <Link to="/dashboard" className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero / Story Scroll Section */}
      <main>
        <StoryScroll />
      </main>

      {/* Bento Grid Features Section */}
      <section className="py-32 px-6 relative z-10 max-w-7xl mx-auto" id="features">
        <div className="mb-16 text-center">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Powerful Features. <br/><span className="text-gray-500">Minimal Interface.</span></h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Designed for teams that demand excellence.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col justify-between group hover:border-white/20 transition-all">
            <div className="mb-12">
              <LayoutDashboard className="w-8 h-8 text-gray-400 mb-4" />
              <h4 className="text-2xl font-bold mb-2">Smart Dashboard</h4>
              <p className="text-gray-400">Your entire workspace at a glance. AI-curated priorities.</p>
            </div>
            <div className="h-64 rounded-xl bg-black/50 border border-white/5 overflow-hidden relative">
              {/* Fake UI mockup inside card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div className="p-4 grid gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
                <div className="h-8 w-3/4 bg-white/10 rounded-md"></div>
                <div className="h-16 w-full bg-white/5 rounded-md"></div>
                <div className="h-16 w-5/6 bg-white/5 rounded-md"></div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-white/20 transition-all">
            <MessageSquare className="w-8 h-8 text-gray-400 mb-4" />
            <h4 className="text-2xl font-bold mb-2">AI Assistant</h4>
            <p className="text-gray-400 mb-8">Chat with your workspace. Extract insights instantly.</p>
            <div className="h-48 rounded-xl bg-black/50 border border-white/5 p-4 flex flex-col gap-2">
              <div className="self-end w-3/4 p-3 rounded-2xl rounded-tr-sm bg-white/10 text-xs text-gray-300">Summarize the Q3 marketing plan.</div>
              <div className="self-start w-5/6 p-3 rounded-2xl rounded-tl-sm bg-blue-500/10 border border-blue-500/20 text-xs text-gray-300">
                <Sparkles className="w-3 h-3 text-blue-400 inline mr-1" />
                Working on it...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-500">FlowState AI © 2026</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
