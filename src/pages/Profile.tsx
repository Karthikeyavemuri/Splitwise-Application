import { useAuth } from '@/contexts/AuthContext'
import { Copy, CloudLightning, LogOut } from 'lucide-react'

export const Profile = () => {
  const { profile, signOut } = useAuth()
  
  const initials = profile?.full_name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U'

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-3xl p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4F46E5]/10 to-transparent pointer-events-none"></div>
        <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-2xl text-white shadow-xl border-2 border-white/20 mb-3">
          {initials}
        </div>
        <h2 className="text-lg font-bold text-white">{profile?.full_name || 'User'}</h2>
        <p className="text-xs text-slate-400">{profile?.email || 'email@example.com'}</p>
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full mt-4 text-[11px] font-mono text-slate-400">
          <span>UID: {profile?.public_user_id || 'SS-XXXXXX'}</span>
          <Copy className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => navigator.clipboard.writeText(profile?.public_user_id || '')} />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">Smart Scan Expense</h3>
          <p className="text-xs text-slate-400 mt-0.5">Upload a receipt image to automatically populate splits.</p>
        </div>
        
        <div className="glass-panel border-2 border-dashed border-white/10 hover:border-[#4F46E5]/50 transition-colors rounded-2xl p-8 text-center cursor-pointer group relative">
          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/jpeg, image/png, application/pdf" />
          <div className="space-y-3 pointer-events-none">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-slate-400 group-hover:text-[#4F46E5] group-hover:bg-indigo-600/10 group-hover:border-indigo-500/20 flex items-center justify-center mx-auto transition-all">
              <CloudLightning className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Drag and drop or click</p>
              <p className="text-xs text-slate-400 mt-1">Supports JPEG, PNG, PDF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
      
      <button onClick={signOut} className="w-full glass-card hover:bg-rose-500/10 border-rose-500/20 hover:border-rose-500/30 text-rose-400 font-semibold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2">
        <LogOut className="w-4 h-4" /> Sign Out
      </button>
    </div>
  )
}
