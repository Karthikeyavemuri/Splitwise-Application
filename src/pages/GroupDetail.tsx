import { ArrowLeft, Plus } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

export const GroupDetail = () => {
  const { id } = useParams()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/groups" className="p-2 glass-card rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Roommates 2026 {id === '2' ? '(Kyoto)' : ''}</h2>
          <p className="text-xs text-slate-400 mt-0.5">Total group balance pool: $1,450.00</p>
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2.5">Balances Breakdown</h3>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <div className="glass-card px-4 py-3 rounded-2xl shrink-0 flex items-center gap-3 border-l-2 border-l-emerald-500">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">AM</div>
            <div>
              <p className="text-xs font-semibold text-white">Alex (You)</p>
              <p className="text-[10px] text-emerald-400">Owed $120.00</p>
            </div>
          </div>
          <div className="glass-card px-4 py-3 rounded-2xl shrink-0 flex items-center gap-3 border-l-2 border-l-rose-500">
            <div className="w-8 h-8 rounded-full bg-indigo-600/40 flex items-center justify-center font-bold text-xs text-white">SM</div>
            <div>
              <p className="text-xs font-semibold text-white">Sarah M.</p>
              <p className="text-[10px] text-rose-400">Owes $85.00</p>
            </div>
          </div>
          <div className="glass-card px-4 py-3 rounded-2xl shrink-0 flex items-center gap-3 border-l-2 border-l-rose-500">
            <div className="w-8 h-8 rounded-full bg-purple-600/40 flex items-center justify-center font-bold text-xs text-white">JD</div>
            <div>
              <p className="text-xs font-semibold text-white">John Doe</p>
              <p className="text-[10px] text-rose-400">Owes $35.00</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Group Activity Ledger</h3>
          <button className="text-xs font-semibold text-[#4F46E5] flex items-center gap-1 bg-indigo-600/10 px-2.5 py-1 rounded-lg border border-indigo-500/20 hover:bg-indigo-600/20 transition">
            <Plus className="w-3.5 h-3.5" /> Add Expense
          </button>
        </div>
        
        <div className="glass-panel rounded-2xl divide-y divide-white/5 overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex flex-col justify-center items-center text-center">
                <span className="text-[8px] uppercase font-bold text-slate-400 leading-none">Jun</span>
                <span className="text-xs font-bold text-white leading-tight">04</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Gigabit Internet Bill</h4>
                <p className="text-xs text-slate-400">Paid by <span className="text-slate-300">Alex</span></p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-white">$90.00</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Shared equally</p>
            </div>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex flex-col justify-center items-center text-center">
                <span className="text-[8px] uppercase font-bold text-slate-400 leading-none">May</span>
                <span className="text-xs font-bold text-white leading-tight">28</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Cleaning Supplies</h4>
                <p className="text-xs text-slate-400">Paid by <span className="text-slate-300">Sarah</span></p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-white">$45.00</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Shared equally</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
