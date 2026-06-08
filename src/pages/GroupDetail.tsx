import { ArrowLeft, UserPlus, Receipt } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useGroupDetail } from '@/hooks/useSupabaseData'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export const GroupDetail = () => {
  const { id } = useParams()
  const { group, members, expenses, loading, refetch } = useGroupDetail(id)
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMemberId, setNewMemberId] = useState('')

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMemberId) return

    try {
      // Find user by public_user_id
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('public_user_id', newMemberId)
        .single()

      if (userError || !user) throw new Error("User not found with that ID")

      // Add to group
      const { error: insertError } = await supabase
        .from('group_members')
        .insert({ group_id: id, user_id: user.id })

      if (insertError) {
        if (insertError.code === '23505') throw new Error("User is already in the group")
        throw insertError
      }

      setNewMemberId('')
      setShowAddMember(false)
      refetch()
    } catch (err: any) {
      alert(err.message || "Failed to add member")
    }
  }

  if (loading) return <div className="p-4 text-slate-400">Loading group details...</div>
  if (!group) return <div className="p-4 text-slate-400">Group not found.</div>

  const totalPool = expenses?.reduce((acc: number, exp: any) => acc + Number(exp.amount), 0) || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/groups" className="p-2 glass-card rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">{group.name}</h2>
          <p className="text-xs text-slate-400 mt-0.5">Total group balance pool: ${totalPool.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2.5">
          <h3 className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Members</h3>
          <button 
            onClick={() => setShowAddMember(!showAddMember)}
            className="text-xs font-semibold text-[#4F46E5] flex items-center gap-1 hover:text-indigo-400 transition"
          >
            <UserPlus className="w-3.5 h-3.5" /> Invite
          </button>
        </div>

        {showAddMember && (
          <form onSubmit={handleAddMember} className="mb-4 glass-panel p-3 rounded-xl flex gap-2">
            <input 
              type="text" 
              placeholder="Enter SS-XXXXXX" 
              value={newMemberId}
              onChange={(e) => setNewMemberId(e.target.value.toUpperCase())}
              className="flex-1 glass-input px-3 py-2 rounded-lg bg-transparent border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-lg text-white font-semibold text-xs">Add</button>
          </form>
        )}

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {members.map(member => (
            <div key={member.id} className="glass-card px-4 py-3 rounded-2xl shrink-0 flex items-center gap-3 border-l-2 border-l-slate-600">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">
                {member.full_name?.substring(0,2).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{member.full_name}</p>
                <p className="text-[10px] text-slate-400">Active Member</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-3">Group Activity Ledger</h3>
        
        {expenses.length === 0 ? (
          <div className="text-center p-6 glass-panel rounded-2xl">
            <Receipt className="w-6 h-6 mx-auto text-slate-500 mb-2" />
            <p className="text-slate-400 text-xs">No expenses yet. Add one using the + button.</p>
          </div>
        ) : (
          <div className="glass-panel rounded-2xl divide-y divide-white/5 overflow-hidden">
            {expenses.map(expense => {
              const date = new Date(expense.created_at)
              return (
                <div key={expense.id} className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex flex-col justify-center items-center text-center">
                      <span className="text-[8px] uppercase font-bold text-slate-400 leading-none">{date.toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-xs font-bold text-white leading-tight">{date.getDate()}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">{expense.description}</h4>
                      <p className="text-xs text-slate-400">Paid by <span className="text-slate-300">{expense.users?.full_name}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">${Number(expense.amount).toFixed(2)}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Shared equally</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
