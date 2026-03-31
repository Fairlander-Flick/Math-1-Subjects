'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next'
import { supabase } from '@/lib/supabase'

type Topic = {
  id: string;
  title: string;
  resources: string;
  completed: boolean;
}

const initialTopics: Topic[] = [
  { id: '1', title: 'Functions and Limits (Fonksiyonlar ve Limit)', resources: 'Tunç Kurt (YouTube), Thomas Calculus Ch 2', completed: false },
  { id: '2', title: 'Continuity (Süreklilik)', resources: 'Khan Academy, Ders Notları', completed: false },
  { id: '3', title: 'Derivatives (Türev Alma Kuralları)', resources: 'Mustafa Yağcı PDF, Thomas Calculus Ch 3', completed: false },
  { id: '4', title: 'Applications of Derivatives (Max/Min, Grafikler)', resources: 'Boğaziçi YouTube, Çıkmış Sorular', completed: false },
  { id: '5', title: 'Integrals (Belirli ve Belirsiz İntegral)', resources: 'Thomas Calculus Ch 5, Tunç Kurt', completed: false },
  { id: '6', title: 'Applications of Integrals (Alan, Hacim)', resources: 'Khan Academy, Soru Çözümleri', completed: false },
];

export default function Home() {
  const [session, setSession] = useState<any>(null)
  const [topics, setTopics] = useState<Topic[]>(initialTopics)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
      // If we wanted to load from DB we would do it here
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const toggleTopic = (id: string) => {
    setTopics(topics.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
    // Here we would also save to Supabase DB
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return <div className="text-white mt-20 text-xl font-bold">Loading...</div>
  }

  if (!session) {
    // Show a sneak peek and a prompt to login
    return (
      <div className="w-full max-w-3xl mx-auto mt-10">
        <div className="glass-container text-center space-y-6">
          <h1 className="text-4xl font-extrabold text-white mb-2">Math 1 Exam Checklist</h1>
          <p className="text-gray-300 mb-8">You need to log in to save your progress!</p>
          <button 
            onClick={() => router.push('/login')}
            className="glass-button w-auto px-8 py-3"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const completedCount = topics.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / topics.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <div className="glass-container">
        <div className="flex justify-between items-center mb-8 border-b border-[var(--glass-border)] pb-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Math 1 Final Prep</h1>
            <p className="text-gray-400 text-sm mt-1">Logged in as {session.user?.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="glass-button secondary !w-auto !px-4 !py-2 text-sm"
          >
            Logout
          </button>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Overall Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-[var(--accent-color)] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <label 
              key={topic.id}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                topic.completed 
                  ? 'bg-white/5 border-[var(--success-color)] shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                  : 'bg-black/20 border-[var(--glass-border)] hover:bg-white/10'
              }`}
            >
              <div className="pt-1">
                <input 
                  type="checkbox" 
                  checked={topic.completed}
                  onChange={() => toggleTopic(topic.id)}
                  className="w-6 h-6 rounded border-gray-400 text-[var(--accent-color)] shadow-sm focus:border-[var(--accent-color)] focus:ring focus:ring-[var(--accent-color)] focus:ring-opacity-50 cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold transition-colors ${topic.completed ? 'text-[var(--success-color)]' : 'text-white'}`}>
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  {topic.resources}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
