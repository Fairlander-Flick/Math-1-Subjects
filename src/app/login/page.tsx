'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Supabase requires an email, so we format the username silently
  const formatEmail = (user: string) => `${user.toLowerCase().replace(/\s+/g, '')}@mathapp.local`

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const { error } = await supabase.auth.signInWithPassword({
      email: formatEmail(username),
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // We register the formatted email
    const { error } = await supabase.auth.signUp({
      email: formatEmail(username),
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      // Auto-login after sign up since we aren't confirming real emails
      await supabase.auth.signInWithPassword({
        email: formatEmail(username),
        password,
      })
      router.push('/')
    }
    setLoading(false)
  }

  const handleDemoLogin = async () => {
    setLoading(true)
    setError(null)
    const demoUser = 'demouser'
    const demoPass = 'DemoMath123!'
    
    // Attempt sign in first
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formatEmail(demoUser),
      password: demoPass,
    })

    if (signInError) {
      // If it fails, sign up the demo user
      const { error: signUpError } = await supabase.auth.signUp({
        email: formatEmail(demoUser),
        password: demoPass,
      })
      if (!signUpError) {
        await supabase.auth.signInWithPassword({
          email: formatEmail(demoUser),
          password: demoPass,
        })
        router.push('/')
      } else {
        setError(signUpError.message)
      }
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <div className="glass-container">
        <h1 className="text-[1.5rem] font-semibold mb-6 text-center text-[#ededed] tracking-tight">Math 1 Login</h1>
        
        {error && (
          <div className="bg-[#110505] border border-[#ff3333] text-[#ff3333] p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-[#888] mb-2">Username</label>
            <input 
              type="text" 
              className="glass-input" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="e.g. mathstudent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#888] mb-2">Password</label>
            <input 
              type="password" 
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength={6}
            />
          </div>
          
          <div className="pt-4 flex flex-col gap-3">
            <button 
              type="submit" 
              className="glass-button"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Login'}
            </button>
            <button 
              type="button" 
              className="glass-button secondary"
              onClick={handleSignUp}
              disabled={loading}
            >
              Sign Up via Username
            </button>

            <div className="flex items-center gap-4 my-2">
              <div className="h-[1px] bg-[#222] flex-1"></div>
              <span className="text-xs text-[#666] uppercase tracking-widest">or</span>
              <div className="h-[1px] bg-[#222] flex-1"></div>
            </div>

            <button 
              type="button" 
              className="glass-button"
              style={{ background: '#0a0a0a', borderColor: '#333' }}
              onClick={handleDemoLogin}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login as Demo User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
