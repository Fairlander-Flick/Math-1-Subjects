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
    
    const { error } = await supabase.auth.signUp({
      email: formatEmail(username),
      password,
    })

    if (error) {
      setError(error.message)
    } else {
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
    
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formatEmail(demoUser),
      password: demoPass,
    })

    if (signInError) {
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
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4">
      <div className="w-full max-w-[420px] bg-[#050505] border border-[#222] rounded-xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold mb-2 text-[#ededed] tracking-tight">Welcome back</h1>
        <p className="text-[#888] text-sm mb-8">Enter your details to sign in to your dashboard</p>
        
        {error && (
          <div className="bg-[#110505] border border-[#ff3333] text-[#ff3333] p-3 rounded-md mb-6 text-xs text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">Username</label>
              <input 
                type="text" 
                className="w-full bg-[#000] border border-[#333] rounded-md px-3 py-2 text-sm text-[#ededed] focus:border-[#666] focus:outline-none transition-colors"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="mathstudent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                className="w-full bg-[#000] border border-[#333] rounded-md px-3 py-2 text-sm text-[#ededed] focus:border-[#666] focus:outline-none transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <button 
              type="button" 
              className="text-sm text-[#888] hover:text-[#ededed] transition-colors"
              onClick={handleSignUp}
              disabled={loading}
            >
              Create account
            </button>
            <button 
              type="submit" 
              className="bg-[#ededed] text-[#000] px-5 py-2 rounded-md text-sm font-semibold hover:bg-white transition-colors"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Sign In'}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#222]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#050505] px-2 text-[#666]">Or continue with</span>
            </div>
          </div>

          <button 
            type="button" 
            className="w-full bg-transparent border border-[#333] text-[#ededed] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#111] transition-colors"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Demo Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
