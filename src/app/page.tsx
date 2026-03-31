'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Topic = {
  id: string;
  title: string;
  subtopics: string[];
  completed: boolean;
}

const initialTopics: Topic[] = [
  {
    id: '1',
    title: '1. Logic & Set Theory',
    completed: false,
    subtopics: [
      'Truth Tables & Logical Equivalences (De Morgan’s)',
      'Quantifiers & English Translation',
      'Set Theory Operations',
      'Function Mapping (Domain/Range)',
      'Function Classifications (Injective, Surjective)'
    ]
  },
  {
    id: '2',
    title: '2. Inequalities & Complex Numbers',
    completed: false,
    subtopics: [
      'Absolute Value & Inequalities',
      'Complex Form Conversions',
      'Complex Equations & Roots',
      'Mock Alert: Div & Exp'
    ]
  },
  {
    id: '3',
    title: '3. Induction & Polynomials',
    completed: false,
    subtopics: [
      'Mathematical Induction Proofs',
      'Horner’s Scheme & Polynomial Factorization',
      'Multiplicity (Double Roots)',
      'Mock Alert: Proving double roots & Imaginary i'
    ]
  },
  {
    id: '4',
    title: '4. Vector Spaces & Linear Maps',
    completed: false,
    subtopics: [
      'Subspace Testing',
      'Linear Independence, Span & Basis',
      'Basis Completion',
      'Matrix Representation of Linear Functions',
      'Rank, Kernel, Range, Nullity'
    ]
  },
  {
    id: '5',
    title: '5. Linear Systems & Gaussian Elimination',
    completed: false,
    subtopics: [
      'Parametric Systems & Invertibility',
      'Solution Count Prediction (0, 1, ∞)',
      'Full Gaussian Elimination (RREF, Ker A)'
    ]
  },
  {
    id: '6',
    title: '6. Affine Geometry',
    completed: false,
    subtopics: [
      'Lines & Planes (Parametric)',
      'Direct Sums & Dimension calculations'
    ]
  },
  {
    id: '7',
    title: '7. Norms, Inner Products & Gram-Schmidt',
    completed: false,
    subtopics: [
      'p-Norms & Convexity Proofs',
      'Inner Product & Orthogonality',
      'Gram-Schmidt & Projections'
    ]
  },
  {
    id: '8',
    title: '8. Determinants & Least Squares',
    completed: false,
    subtopics: [
      'Vector Cross Product',
      'Determinants & Invertibility (Laplace)',
      'Least Squares (Normal Equations)',
      'Mock Alert: Cross product with λ / Q3a & 3b'
    ]
  },
  {
    id: '9',
    title: '9. Eigenvalues & Matrix Theory',
    completed: false,
    subtopics: [
      'Characteristic Polynomials',
      'Theoretical Eigen-Properties',
      'Positive Definiteness (PD)',
      'Mock Alert: Q1d & Q4'
    ]
  }
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
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

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

  const completedCount = topics.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / topics.length) * 100);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* SaaS Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#222]">
        <div>
          <h1 className="text-2xl font-bold text-[#ededed] tracking-tight">Math 1 Syllabus</h1>
          <p className="text-[#888] text-sm mt-1">Track your relationship with limits and calculus</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <span className="text-xs text-[#888] py-1.5 px-3 bg-[#0a0a0a] border border-[#222] rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
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

      {/* Main SaaS Table/List View */}
      <div className="bg-[#050505] border border-[#222] rounded-xl overflow-hidden shadow-2xl">
        
        {/* Table Header / Progress Bar */}
        <div className="px-6 py-4 border-b border-[#222] flex flex-col sm:flex-row sm:items-center justify-between bg-[#0a0a0a]">
          <span className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-2 sm:mb-0">
            Roadmap Progress ({completedCount}/{topics.length})
          </span>
          <div className="flex items-center gap-3 w-full sm:w-64">
            <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#ededed] transition-all duration-700 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono text-[#888]">{progressPercent}%</span>
          </div>
        </div>

        {/* Requirements List */}
        <div className="divide-y divide-[#1a1a1a]">
          {topics.map((topic) => (
            <div 
              key={topic.id}
              className={`group flex flex-col lg:flex-row items-start lg:items-center p-4 sm:p-5 hover:bg-[#0a0a0a] transition-colors ${topic.completed ? 'opacity-50 grayscale' : ''}`}
            >
              
              <div className="flex items-center gap-4 w-full lg:w-[35%] mb-3 lg:mb-0">
                <input 
                  type="checkbox" 
                  checked={topic.completed}
                  onChange={() => toggleTopic(topic.id)}
                  className="appearance-none w-5 h-5 border border-[#444] rounded bg-black cursor-pointer checked:bg-[#ededed] checked:border-[#ededed] transition-colors relative flex-shrink-0
                  before:content-[''] before:absolute before:inset-0 before:m-auto before:w-1.5 before:h-2.5 before:border-r-2 before:border-b-2 before:border-black before:rotate-45 before:opacity-0 checked:before:opacity-100"
                />
                <h3 className={`text-sm font-medium tracking-tight ${topic.completed ? 'text-[#888] line-through' : 'text-[#ededed]'}`}>
                  {topic.title}
                </h3>
              </div>
              
              <div className="w-full lg:w-[65%] pl-9 lg:pl-0">
                <div className="flex flex-wrap gap-2">
                  {topic.subtopics.map((sub, idx) => {
                    const isMock = sub.includes('Mock');
                    return (
                      <span 
                        key={idx} 
                        className={`text-[11px] px-2.5 py-1 rounded-md border ${
                          isMock 
                            ? 'border-[#332b14] bg-[#1a1608] text-[#ceb366]' 
                            : 'border-[#222] bg-[#000] text-[#888]'
                        }`}
                      >
                        {sub}
                      </span>
                    )
                  })}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
