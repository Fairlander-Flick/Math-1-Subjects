'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { checklistsData } from '@/data/checklists'

export default function Home() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'lectures' | 'exercises' | 'mocks'>('lectures')
  
  // Array of completed subtopic IDs
  const [completedSubtopics, setCompletedSubtopics] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user?.user_metadata?.completedSubtopics) {
        setCompletedSubtopics(session.user.user_metadata.completedSubtopics)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user?.user_metadata?.completedSubtopics) {
        setCompletedSubtopics(session.user.user_metadata.completedSubtopics)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const toggleSubtopic = (id: string) => {
    setCompletedSubtopics(prev => {
      const newCompleted = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      
      // Persist the new array to Supabase Auth Cloud (Zero-config Database)
      supabase.auth.updateUser({
        data: { completedSubtopics: newCompleted }
      }).catch(console.error);

      return newCompleted;
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Calculate generic progress based on current tab's items
  const currentData = checklistsData[activeTab]
  const totalSubtopics = useMemo(() => currentData.reduce((acc, topic) => acc + topic.subtopics.length, 0), [currentData])
  const tabCompletedCount = useMemo(() => 
    currentData.reduce((acc, topic) => 
      acc + topic.subtopics.filter(s => completedSubtopics.includes(s.id)).length
    , 0), 
  [currentData, completedSubtopics])
  
  const progressPercent = totalSubtopics === 0 ? 0 : Math.round((tabCompletedCount / totalSubtopics) * 100)

  if (loading) {
    return <div className="text-[#888] mt-20 text-sm font-medium text-center">Loading workspace...</div>
  }

  if (!session) {
    return (
      <div className="w-full max-w-lg mx-auto mt-20 text-center">
        <h1 className="text-2xl font-bold text-[#ededed] mb-2">Math 1 Workspace</h1>
        <p className="text-[#888] text-sm mb-6">Authentication required to view this project roadmap.</p>
        <button 
          onClick={() => router.push('/login')}
          className="bg-[#ededed] text-[#000] px-5 py-2 rounded-md text-sm font-semibold hover:bg-white transition-colors"
        >
          Sign in
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      
      {/* SaaS Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#222]">
        <div>
          <h1 className="text-2xl font-bold text-[#ededed] tracking-tight">Math 1 Mastery Tracker</h1>
          <p className="text-[#888] text-sm mt-1">Granular tracking for maximum grade efficiency.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <span className="text-xs text-[#888] py-1.5 px-3 bg-[#0a0a0a] border border-[#222] rounded-full flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            {session.user?.email?.split('@')[0]}
          </span>
          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-[#888] hover:text-[#ededed] transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="flex gap-2 bg-[#0a0a0a] p-1.5 border border-[#222] rounded-lg w-fit mb-8 shadow-md">
        {[
          { id: 'lectures', label: 'Lecture Theory' },
          { id: 'exercises', label: 'Exercise Sheets' },
          { id: 'mocks', label: 'Mock Exam' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)} 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-[#222] text-[#fff] shadow-sm transform scale-100' 
                : 'text-[#666] hover:text-[#bbb] hover:bg-[#111] scale-95'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main SaaS Table/List View */}
      <div className="bg-[#050505] border border-[#222] rounded-xl overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* Table Header / Progress Bar */}
        <div className="px-6 py-4 border-b border-[#222] flex flex-col sm:flex-row sm:items-center justify-between bg-[#0a0a0a]">
          <span className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-2 sm:mb-0">
            {activeTab} Progress ({tabCompletedCount}/{totalSubtopics})
          </span>
          <div className="flex items-center gap-3 w-full sm:w-64">
            <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#444] to-[#ededed] transition-all duration-700 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono text-[#888]">{progressPercent}%</span>
          </div>
        </div>

        {/* Dynamic Nested Requirements List */}
        <div className="divide-y divide-[#161616]">
          {currentData.map((topic) => {
            const isTopicFullyCompleted = topic.subtopics.every(s => completedSubtopics.includes(s.id));
            
            return (
              <div 
                key={topic.id}
                className={`flex flex-col p-6 hover:bg-[#0a0a0a] transition-all duration-300 ${isTopicFullyCompleted ? 'bg-[#080808] opacity-75' : ''}`}
              >
                {/* Topic Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${isTopicFullyCompleted ? 'bg-[#10b981]' : 'bg-[#333]'}`}></div>
                  <h3 className={`text-[1.05rem] font-semibold tracking-tight transition-colors ${isTopicFullyCompleted ? 'text-[#666] line-through decoration-[#444]' : 'text-[#ededed]'}`}>
                    {topic.title}
                  </h3>
                </div>
                
                {/* Subtopics Checklist */}
                <div className="pl-5 space-y-3 border-l-2 border-[#1a1a1a] ml-[3px]">
                  {topic.subtopics.map((sub) => {
                    const isSubCompleted = completedSubtopics.includes(sub.id);
                    return (
                      <label 
                        key={sub.id} 
                        className="group flex items-start gap-3 cursor-pointer"
                      >
                        <div className="pt-0.5">
                          <input 
                            type="checkbox" 
                            checked={isSubCompleted}
                            onChange={() => toggleSubtopic(sub.id)}
                            className="appearance-none w-4 h-4 border border-[#444] rounded-sm bg-black cursor-pointer checked:bg-[#555] checked:border-[#555] group-hover:border-[#666] transition-colors relative flex-shrink-0
                            before:content-[''] before:absolute before:inset-0 before:m-auto before:w-1 before:h-2 before:border-r-2 before:border-b-2 before:border-[#000] before:rotate-45 before:opacity-0 checked:before:opacity-100"
                          />
                        </div>
                        <span className={`text-[0.9rem] flex-1 leading-snug transition-colors ${isSubCompleted ? 'text-[#555] line-through' : 'text-[#aaa] group-hover:text-[#ccc]'} ${sub.isMockAlert ? 'font-medium !text-[#ceb366]' : ''}`}>
                          {sub.label}
                        </span>
                      </label>
                    )
                  })}
                </div>

              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
