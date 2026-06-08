import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { useGroups } from '@/hooks/useSupabaseData'
import { X, Loader2 } from 'lucide-react'

export const AddExpenseModal = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuth()
  const { groups } = useGroups()
  
  const [groupId, setGroupId] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (groups.length > 0 && !groupId) {
      setGroupId(groups[0].id)
    }
  }, [groups])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !groupId || !description || !amount) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      // 1. Insert Expense
      const { data: expense, error: expenseError } = await supabase
        .from('expenses')
        .insert({
          group_id: groupId,
          description,
          amount: parseFloat(amount),
          paid_by: user.id,
          split_type: 'Equal'
        })
        .select()
        .single()

      if (expenseError) throw expenseError

      // 2. Fetch Group Members
      const { data: members, error: membersError } = await supabase
        .from('group_members')
        .select('user_id')
        .eq('group_id', groupId)

      if (membersError) throw membersError

      if (members && members.length > 0) {
        // 3. Insert Splits
        const splitAmount = parseFloat(amount) / members.length
        
        const splitsToInsert = members.map(m => ({
          expense_id: expense.id,
          user_id: m.user_id,
          amount_owed: splitAmount
        }))

        const { error: splitError } = await supabase
          .from('expense_splits')
          .insert(splitsToInsert)

        if (splitError) throw splitError
      }

      onClose()
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to add expense')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all">
      <div className="glass-panel border border-white/15 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-scale-up p-5 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="text-xl font-bold text-white mb-6">Add Expense</h3>
        
        {error && <div className="p-3 mb-4 text-sm text-red-200 bg-red-900/50 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Group</label>
            <select 
              value={groupId} 
              onChange={e => setGroupId(e.target.value)}
              className="glass-input w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>Select a group...</option>
              {groups.map(g => (
                <option key={g.id} value={g.id} className="bg-slate-800">{g.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
            <input 
              type="text" 
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Dinner at Mario's"
              className="glass-input w-full px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Amount ($)</label>
            <input 
              type="number" 
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              className="glass-input w-full px-4 py-3 rounded-xl bg-transparent border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Expense'}
          </button>
        </form>
      </div>
    </div>
  )
}
