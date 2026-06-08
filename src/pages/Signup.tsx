import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { signUpWithProfile } from '@/lib/auth'

export const Signup = () => {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    setLoading(true)
    setError(null)
    try {
      await signUpWithProfile(email, password, fullName)
      navigate('/')
    } catch (err: any) {
      setError(err.message || "Failed to sign up")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col justify-center p-4 h-full min-h-screen max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-600/20 text-[#4F46E5] mb-3 border border-indigo-500/20">
          <UserPlus className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Create Account</h1>
        <p className="text-sm text-slate-400 mt-1">Start optimizing your shared lifestyle finances.</p>
      </div>

      <form onSubmit={handleSignup} className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
        {error && <div className="text-rose-400 text-sm text-center bg-rose-500/10 p-2 rounded-xl">{error}</div>}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
          <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white transition" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white transition" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white transition" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Confirm Password</label>
          <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white transition" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#4F46E5] hover:bg-indigo-700 active:scale-[0.98] transition-all text-white font-semibold rounded-xl py-3 mt-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      <p className="text-center text-sm text-slate-400 mt-6">
        Already have an account? <Link to="/auth/login" className="text-[#4F46E5] font-semibold hover:underline bg-transparent border-none cursor-pointer">Log in</Link>
      </p>
    </div>
  )
}
