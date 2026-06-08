import { useAuth } from '@/contexts/AuthContext'
import { Home, Plane } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  const { profile } = useAuth()
  
  // Fake initials
  const initials = profile?.full_name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-400">Welcome back,</p>
          <h2 className="text-xl font-bold text-white tracking-tight">{profile?.full_name || 'User'}</h2>
        </div>
        <Link to="/profile" className="w-10 h-10 rounded-full border border-white/20 bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm text-white shadow-md">
          {initials}
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="glass-panel rounded-2xl p-3.5 text-center flex flex-col justify-between">
          <span className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">You are owed</span>
          <span className="text-lg font-bold text-emerald-400 mt-1">$420.50</span>
        </div>
        <div className="glass-panel rounded-2xl p-3.5 text-center flex flex-col justify-between">
          <span className="text-[10px] uppercase font-semibold text-rose-400 tracking-wider">You owe</span>
          <span className="text-lg font-bold text-rose-400 mt-1">$184.00</span>
        </div>
        <div className="glass-panel bg-gradient-to-b from-indigo-600/30 to-indigo-900/20 border border-indigo-500/30 rounded-2xl p-3.5 text-center flex flex-col justify-between">
          <span className="text-[10px] uppercase font-semibold text-indigo-300 tracking-wider">Net Balance</span>
          <span className="text-lg font-bold text-white mt-1">+$236.50</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-400">My Groups</h3>
          <Link to="/groups" className="text-xs font-semibold text-[#4F46E5] hover:underline">View All</Link>
        </div>
        <div className="space-y-3">
          <Link to="/groups/1" className="glass-card p-4 rounded-2xl flex justify-between items-center hover:bg-white/10 transition cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-600/20 border border-indigo-500/20 text-[#4F46E5] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Roommates 2026</h4>
                <p className="text-xs text-slate-400 mt-0.5">3 active members</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-emerald-400 font-medium">Owed $120.00</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Total: $1,450</p>
            </div>
          </Link>

          <Link to="/groups/2" className="glass-card p-4 rounded-2xl flex justify-between items-center hover:bg-white/10 transition cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Kyoto Trip 🇯🇵</h4>
                <p className="text-xs text-slate-400 mt-0.5">5 active members</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-rose-400 font-medium">You owe $64.00</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Total: $3,200</p>
            </div>
          </Link>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-400 mb-3">Recent Expenses</h3>
        <div className="glass-panel rounded-2xl divide-y divide-white/5 overflow-hidden">
          <div className="p-4 flex justify-between items-center hover:bg-white/5 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-center items-center text-center">
                <span className="text-[9px] uppercase tracking-tight text-slate-400 leading-none">Jun</span>
                <span className="text-sm font-bold text-white leading-tight">05</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Whole Foods Groceries</h4>
                <p className="text-xs text-slate-400 mt-0.5">Paid by <span className="text-slate-300 font-medium">You</span> • Roommates</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">$88.50</p>
              <p className="text-[10px] text-emerald-400 mt-0.5">You lent $59.00</p>
            </div>
          </div>
          <div className="p-4 flex justify-between items-center hover:bg-white/5 transition border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-center items-center text-center">
                <span className="text-[9px] uppercase tracking-tight text-slate-400 leading-none">Jun</span>
                <span className="text-sm font-bold text-white leading-tight">02</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Netflix Premium Split</h4>
                <p className="text-xs text-slate-400 mt-0.5">Paid by <span className="text-slate-300 font-medium">Sarah M.</span> • Entertainment</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">$22.99</p>
              <p className="text-[10px] text-rose-400 mt-0.5">You owe $7.66</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
