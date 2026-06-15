import { Users, UserPlus, Mail } from 'lucide-react'

export function Team() {
  const team = [
    { name: 'Sujith', role: 'Owner', email: 'sujith@flowstate.ai', status: 'Active' },
    { name: 'Alex', role: 'Developer', email: 'alex@flowstate.ai', status: 'Active' },
    { name: 'Sam', role: 'Designer', email: 'sam@flowstate.ai', status: 'Offline' },
    { name: 'Jordan', role: 'Viewer', email: 'jordan@flowstate.ai', status: 'Invited' },
  ]

  return (
    <div className="p-8 w-full h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Team Directory</h1>
            <p className="text-gray-400">Manage access and roles for your workspace members.</p>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Invite Member
          </button>
        </div>

        <div className="border border-white/10 bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {team.map((member, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                      {member.name[0]}
                    </div>
                    <span className="font-medium text-gray-200">{member.name}</span>
                  </td>
                  <td className="px-6 py-4">{member.email}</td>
                  <td className="px-6 py-4">
                    <span className="bg-white/10 px-2.5 py-1 rounded-md text-xs font-medium text-gray-300">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-green-500' : member.status === 'Invited' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
                      {member.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-500 hover:text-white transition p-1">
                      <Mail className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
