import { Settings as SettingsIcon, Bell, Shield, Paintbrush } from 'lucide-react'

export function Settings() {
  return (
    <div className="flex h-full w-full">
      {/* Sidebar Settings Nav */}
      <div className="w-64 border-r border-white/10 bg-background/50 p-6">
        <h2 className="font-bold text-lg mb-6 tracking-tight">Settings</h2>
        <nav className="space-y-1">
          <a className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/10 text-white text-sm font-medium cursor-pointer"><SettingsIcon className="w-4 h-4 opacity-70" /> General</a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:bg-white/5 hover:text-gray-200 text-sm font-medium cursor-pointer"><Shield className="w-4 h-4 opacity-70" /> Security</a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:bg-white/5 hover:text-gray-200 text-sm font-medium cursor-pointer"><Bell className="w-4 h-4 opacity-70" /> Notifications</a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:bg-white/5 hover:text-gray-200 text-sm font-medium cursor-pointer"><Paintbrush className="w-4 h-4 opacity-70" /> Appearance</a>
        </nav>
      </div>
      
      {/* Settings Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">General Preferences</h1>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b border-white/10 pb-2">Workspace Profile</h3>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                  FS
                </div>
                <div>
                  <button className="bg-white/10 border border-white/20 px-4 py-2 rounded-md text-sm font-medium hover:bg-white/20 transition">Upload Logo</button>
                  <p className="text-xs text-gray-500 mt-2">Recommended size: 256x256px.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Workspace Name</label>
                <input type="text" defaultValue="FlowState Team" className="w-full max-w-md bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Workspace URL</label>
                <div className="flex w-full max-w-md">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-white/10 bg-white/5 text-gray-500 sm:text-sm">flowstate.ai/</span>
                  <input type="text" defaultValue="team" className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md bg-white/5 border border-white/10 text-white sm:text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition shadow-lg shadow-blue-500/20">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
