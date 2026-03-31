'use client'

import { useState } from 'react'
import { useRouter } from 'next'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // Attempt Supabase login
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message + ' (Did you add your Supabase credentials?)')
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message + ' (Did you add your Supabase credentials?)')
    } else {
      alert('Check your email for the confirmation link!')
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <div className="glass-container">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Math 1 Login</h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input 
              type="email" 
              className="glass-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="student@university.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input 
              type="password" 
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          
          <div className="pt-2 flex flex-col gap-3">
            <button 
              type="submit" 
              className="glass-button"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Login to Continue'}
            </button>
            <button 
              type="button" 
              className="glass-button secondary"
              onClick={handleSignUp}
              disabled={loading}
            >
              Register New Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
