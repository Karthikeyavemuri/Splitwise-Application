import { useState } from 'react'
import { Plus, Users as UsersIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGroups } from '@/hooks/useSupabaseData'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export const Groups = () => {
  const { groups, loading, refetch } = useGroups()
  const { user } = useAuth()
  const [isCreating, setIsCreating] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newGroupName || !user) return

    try {
      const { data, error } = await supabase
        .from('groups')
        .insert({ name: newGroupName, created_by: user.id })
        .select()
        .single()
        
      if (error) throw error

      // Automatically add creator to group_members
      await supabase
        .from('group_members')
        .insert({ group_id: data.id, user_id: user.id })

      setNewGroupName('')
      setIsCreating(false)
      refetch()
    } catch (err) {
      console.error(err)
      alert("Failed to create group")
    }
  }

  if (loading) return <div className="p-4 text-slate-400">Loading groups...</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">My Groups</h2>
          <p className="text-xs text-slate-400">Manage balances across all circles</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="glass-card hover:bg-white/10 p-2.5 rounded-xl transition text-[#4F46E5]"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreateGroup} className="glass-panel p-4 rounded-xl flex gap-2">
          <input 
            type="text" 
            placeholder="Group Name" 
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="flex-1 glass-input px-3 py-2 rounded-lg bg-transparent border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-semibold text-sm">Save</button>
          <button type="button" onClick={() => setIsCreating(false)} className="px-3 py-2 text-slate-400 hover:text-white">Cancel</button>
        </form>
      )}

      {groups.length === 0 && !isCreating && (
        <div className="text-center p-8 glass-panel rounded-2xl mt-4">
          <UsersIcon className="w-8 h-8 mx-auto text-slate-500 mb-2" />
          <p className="text-slate-400 text-sm">You haven't joined any groups yet.</p>
        </div>
      )}

      <div className="space-y-3 pt-2">
        {groups.map(group => {
          const memberCount = group.group_members?.length || 0;
          const totalPool = group.expenses?.reduce((acc: number, exp: any) => acc + Number(exp.amount), 0) || 0;

          return (
            <Link key={group.id} to={`/groups/${group.id}`} className="block glass-panel p-5 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-600/10 rounded-full blur-xl group-hover:bg-indigo-600/20 transition-all"></div>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-indigo-600/20 rounded-xl border border-indigo-500/20 text-[#4F46E5] flex items-center justify-center">
                    <UsersIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-white">{group.name}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/5 text-sm">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Members</p>
                  <p className="font-semibold text-white mt-0.5">{memberCount} active</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Total Pool</p>
                  <p className="font-semibold text-white mt-0.5">${totalPool.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
