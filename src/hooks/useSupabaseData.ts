import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export function useGroups() {
  const { user } = useAuth()
  const [groups, setGroups] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchGroups = async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('groups')
      .select(`
        *,
        group_members(user_id, users(full_name)),
        expenses(amount)
      `)
      .order('created_at', { ascending: false })
      
    if (!error && data) {
      setGroups(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchGroups()
  }, [user])

  return { groups, loading, refetch: fetchGroups }
}

export function useGroupDetail(groupId: string | undefined) {
  const { user } = useAuth()
  const [group, setGroup] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDetail = async () => {
    if (!groupId || !user) return
    setLoading(true)
    
    // Group details
    const { data: groupData } = await supabase.from('groups').select('*').eq('id', groupId).single()
    
    // Members
    const { data: memberData } = await supabase.from('group_members').select('user_id, users(full_name, id)').eq('group_id', groupId)
    
    // Expenses
    const { data: expenseData } = await supabase.from('expenses')
      .select('*, users(full_name)')
      .eq('group_id', groupId)
      .order('created_at', { ascending: false })
      
    setGroup(groupData)
    setMembers(memberData?.map(m => m.users) || [])
    setExpenses(expenseData || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchDetail()
  }, [groupId, user])

  return { group, members, expenses, loading, refetch: fetchDetail }
}

export function useRecentExpenses() {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState<any[]>([])

  useEffect(() => {
    if (!user) return
    const fetchRecent = async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*, groups(name), users(full_name)')
        .order('created_at', { ascending: false })
        .limit(5)
      if (!error && data) setExpenses(data)
    }
    fetchRecent()
  }, [user])

  return expenses
}
