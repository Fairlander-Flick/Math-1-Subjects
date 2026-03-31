'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next'
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
    title: '1. Logic & Set Theory (Lectures 1-3)',
    completed: false,
    subtopics: [
      'Truth Tables & Logical Equivalences (De Morgan’s) - Sheet 1',
      'Quantifiers & English Translation - Sheet 1, 3',
      'Set Theory Operations (Power Sets, Union, Intersection) - Sheet 1, 2',
      'Function Mapping (Domain/Range) - Sheet 2',
      'Function Classifications (Injective, Surjective, Invertibility)'
    ]
  },
  {
    id: '2',
    title: '2. Inequalities & Complex Numbers (Lectures 4-8)',
    completed: false,
    subtopics: [
      'Absolute Value & Inequalities - Sheet 3',
      'Complex Form Conversions (Cartesian, Trig, Exp) - Sheet 4. Mock Alert: Div & Exp',
      'Complex Equations & Roots (Regular Polygons) - Sheet 4'
    ]
  },
  {
    id: '3',
    title: '3. Induction & Polynomials (Lectures 9-10)',
    completed: false,
    subtopics: [
      'Mathematical Induction Proofs - Sheet 5. Mock Alert: Imaginary unit i',
      'Horner’s Scheme & Polynomial Factorization - Sheet 5',
      'Multiplicity (Double Roots). Mock Alert: Proving double roots'
    ]
  },
  {
    id: '4',
    title: '4. Vector Spaces & Linear Maps (Lectures 11-15)',
    completed: false,
    subtopics: [
      'Subspace Testing (Closure) - Sheet 6',
      'Linear Independence, Span & Basis - Sheet 6',
      'Basis Completion - Sheet 7',
      'Matrix Representation of Linear Functions - Sheet 7 (High Priority)',
      'Fundamental Dimensions (Rank, Kernel, Range, Nullity) - Sheet 8'
    ]
  },
  {
    id: '5',
    title: '5. Linear Systems & Gaussian Elimination (Lectures 16-18)',
    completed: false,
    subtopics: [
      'Parametric Systems & Invertibility - Sheet 8, 9',
      'Solution Count Prediction (0, 1, or ∞) - Sheet 8',
      'Full Gaussian Elimination (RREF, Ker A, Rank) - Sheet 9'
    ]
  },
  {
    id: '6',
    title: '6. Affine Geometry & Subspaces (Lectures 19-20)',
    completed: false,
    subtopics: [
      'Lines & Planes (Parametric, Intersections) - Sheet 10',
      'Direct Sums & Dimension calculations - Sheet 10'
    ]
  },
  {
    id: '7',
    title: '7. Norms, Inner Products & Gram-Schmidt (Lectures 21-23)',
    completed: false,
    subtopics: [
      'p-Norms & Convexity Proofs (Triangle Inequality) - Sheet 11',
      'Inner Product & Orthogonality - Sheet 12',
      'Gram-Schmidt & Projections (ONB) - Sheet 12'
    ]
  },
  {
    id: '8',
    title: '8. Determinants & Least Squares (Lectures 24-25)',
    completed: false,
    subtopics: [
      'Vector Cross Product. Mock Alert: Cross product with λ',
      'Determinants & Invertibility (Laplace Expansion) - Sheet 13',
      'Least Squares Optimization (Normal Equations) - Sheet 13. Mock Alert: Q3a & 3b'
    ]
  },
  {
    id: '9',
    title: '9. Eigenvalues & Matrix Theory (Lectures 26-28)',
    completed: false,
    subtopics: [
      'Characteristic Polynomials & Multiplicities - Sheet 14. Mock Alert: Q1d',
      'Theoretical Eigen-Properties - Sheet 14',
      'Positive Definiteness (PD) & Unified Theory. Mock Alert: Q4'
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
      // Database load logic would go here
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
    // Database save logic would go here
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return <div className="text-white mt-20 text-xl font-bold">Loading...</div>
  }

  if (!session) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-10">
        <div className="glass-container text-center space-y-6">
          <h1 className="text-4xl font-extrabold text-white mb-2">Math 1 Exam Checklist</h1>
          <p className="text-gray-300 mb-8">You need to log in to track your detailed study progress!</p>
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
    <div className="w-full max-w-4xl mx-auto mt-10">
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

        <div className="space-y-6">
          {topics.map((topic) => (
            <label 
              key={topic.id}
              className={`flex items-start gap-4 p-5 rounded-xl border transition-all cursor-pointer ${
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
                <h3 className={`text-xl font-bold mb-3 transition-colors ${topic.completed ? 'text-[var(--success-color)]' : 'text-white'}`}>
                  {topic.title}
                </h3>
                <ul className="space-y-2">
                  {topic.subtopics.map((sub, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 text-[var(--accent-color)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      {sub.includes('Mock Alert') ? (
                        <span className="text-yellow-400 font-medium">{sub}</span>
                      ) : (
                        <span>{sub}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
