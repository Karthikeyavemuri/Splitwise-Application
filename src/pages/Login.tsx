import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Wallet } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <div className="flex-1 flex flex-col justify-center animate-fade-in p-4 h-full min-h-screen max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-600/20 text-[#4F46E5] mb-3 border border-indigo-500/20">
          <Wallet className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back</h1>
        <p className="text-sm text-slate-400 mt-1">Split expenses effortlessly with friends.</p>
      </div>

      <form onSubmit={handleLogin} className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
        {error && <div className="text-rose-400 text-sm text-center bg-rose-500/10 p-2 rounded-xl">{error}</div>}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white transition" />
        </div>
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
            <a href="#" className="text-xs text-[#4F46E5] hover:underline">Forgot?</a>
          </div>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white transition" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#4F46E5] hover:bg-indigo-700 active:scale-[0.98] transition-all text-white font-semibold rounded-xl py-3 mt-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className="text-center text-sm text-slate-400 mt-6">
        Don't have an account? <Link to="/auth/signup" className="text-[#4F46E5] font-semibold hover:underline bg-transparent border-none cursor-pointer">Sign up</Link>
      </p>
    </div>
  )
}
