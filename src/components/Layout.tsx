import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Fingerprint, Plus } from 'lucide-react'
import { useState } from 'react'
import { AddExpenseModal } from './AddExpenseModal'

export const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showAddModal, setShowAddModal] = useState(false)

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      <main className="w-full max-w-md mx-auto flex-1 flex flex-col relative pb-24 px-4 pt-6 h-full">
        <Outlet />
      </main>

      <button onClick={() => setShowAddModal(true)} className="fixed bottom-24 right-6 w-14 h-14 bg-[#4F46E5] text-white rounded-full shadow-xl shadow-indigo-600/40 flex items-center justify-center active:scale-95 transition-all z-40 group hover:bg-indigo-700">
          <Plus className="w-6 h-6 transition-transform group-hover:rotate-90" />
      </button>

      {showAddModal && <AddExpenseModal onClose={() => setShowAddModal(false)} />}

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass-panel border-t border-white/10 rounded-t-3xl shadow-2xl flex justify-around items-center py-3 px-2 z-40">
        <button onClick={() => navigate('/')} className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-[#4F46E5]' : 'text-slate-400 hover:text-white'}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-wide">Home</span>
        </button>
        <button onClick={() => navigate('/groups')} className={`flex flex-col items-center gap-1 transition-colors ${isActive('/groups') ? 'text-[#4F46E5]' : 'text-slate-400 hover:text-white'}`}>
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-wide">Groups</span>
        </button>
        <button onClick={() => navigate('/profile')} className={`flex flex-col items-center gap-1 transition-colors ${isActive('/profile') ? 'text-[#4F46E5]' : 'text-slate-400 hover:text-white'}`}>
            <Fingerprint className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-wide">Identity</span>
        </button>
      </nav>
    </>
  )
}
