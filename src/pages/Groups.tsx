import { Plus, Home, Plane } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Groups = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">My Groups</h2>
          <p className="text-xs text-slate-400">Manage balances across all circles</p>
        </div>
        <button className="glass-card hover:bg-white/10 p-2.5 rounded-xl transition text-[#4F46E5]">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 pt-2">
        <Link to="/groups/1" className="block glass-panel p-5 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-600/10 rounded-full blur-xl group-hover:bg-indigo-600/20 transition-all"></div>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-indigo-600/20 rounded-xl border border-indigo-500/20 text-[#4F46E5] flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Roommates 2026</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Settled Up</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/5 text-sm">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Members</p>
              <p className="font-semibold text-white mt-0.5">3 active</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Total Pool</p>
              <p className="font-semibold text-white mt-0.5">$1,450.00</p>
            </div>
          </div>
        </Link>

        <Link to="/groups/2" className="block glass-panel p-5 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-600/10 rounded-full blur-xl group-hover:bg-purple-600/20 transition-all"></div>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-purple-600/20 rounded-xl border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Kyoto Trip 🇯🇵</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">Pending Owed</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/5 text-sm">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Members</p>
              <p className="font-semibold text-white mt-0.5">5 active</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Total Pool</p>
              <p className="font-semibold text-white mt-0.5">$3,200.00</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
