export type Subtopic = {
  id: string;
  label: string;
  isMockAlert?: boolean;
}

export type Topic = {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

export const checklistsData: Record<string, Topic[]> = {
  lectures: [
    {
      id: "l1",
      title: "1. Logic & Quantifiers",
      subtopics: [
        { id: "l1-1", label: "Statements & Connectors: P ∧ Q, P ∨ Q, ¬P, P ⇒ Q, P ⇔ Q" },
        { id: "l1-2", label: "Truth Tables: Proving Tautologies and Contradictions" },
        { id: "l1-3", label: "Logical Laws: De Morgan's, Distributive, Commutative" },
        { id: "l1-4", label: "Quantifiers: Universal (∀), Existential (∃), Unique (∃!)" },
        { id: "l1-5", label: "Conditionals: Necessary and Sufficient conditions" }
      ]
    },
    {
      id: "l2",
      title: "2. Set Theory & Functions",
      subtopics: [
        { id: "l2-1", label: "Set Definitions: Empty set ∅, Proper subsets A ⊂ B" },
        { id: "l2-2", label: "Power Sets: P(S) and cardinality 2^n" },
        { id: "l2-3", label: "Set Operations: Union ∪, Intersection ∩, Difference \\, Symmetric Δ" },
        { id: "l2-4", label: "Cartesian Product: A × B = {(a, b) : a ∈ A, b ∈ B}" },
        { id: "l2-5", label: "Function Mapping: Domain, Codomain, Range, Pre-image" },
        { id: "l2-6", label: "Function Types: Injective, Surjective, Bijective" },
        { id: "l2-7", label: "Composition: (f ∘ g)(x) = f(g(x))" }
      ]
    },
    {
      id: "l3",
      title: "3. Number Systems & Complex Numbers",
      subtopics: [
         { id: "l3-1", label: "Induction Principle: Proving P(n) for all n ∈ ℕ" },
         { id: "l3-2", label: "Elementary Functions: Absolute value |x|, Triangle Inequality" },
         { id: "l3-3", label: "Complex Cartesian Form: z = x + iy, Conjugation" },
         { id: "l3-4", label: "Polar & Exponential Forms: z = r(cos θ + i sin θ) = re^(iθ)" },
         { id: "l3-5", label: "Roots of Complex Numbers: z^n = a, graphical symmetry" }
      ]
    },
    {
      id: "l4",
      title: "4. Polynomials",
      subtopics: [
         { id: "l4-1", label: "Polynomial Algebra: Addition, Multiplication, Division" },
         { id: "l4-2", label: "Root Finding: Horner's Scheme, Fundamental Theorem" },
         { id: "l4-3", label: "Multiplicity: single, double, n-fold roots" }
      ]
    },
    {
      id: "l5",
      title: "5. Vector Spaces & Linear Maps",
      subtopics: [
         { id: "l5-1", label: "Vector Subspaces: Closure under addition/scalar mul" },
         { id: "l5-2", label: "Linear Algebra: Combinations, Span, Independence" },
         { id: "l5-3", label: "Bases: Existence, Dimension dim(V), Completion" },
         { id: "l5-4", label: "Linear Functions: Matrix representation M_B^C(f)" },
         { id: "l5-5", label: "Fundamental Spaces: Ker(f), Im(f), Rank-Nullity" }
      ]
    },
    {
      id: "l6",
      title: "6. Linear Systems & Gaussian",
      subtopics: [
         { id: "l6-1", label: "System Types: Homogeneous (Ax=0) & Inhomogeneous (Ax=b)" },
         { id: "l6-2", label: "Gaussian Elimination: Row ops, RREF" },
         { id: "l6-3", label: "Matrix Algebra: Matrix products, Permutations" }
      ]
    },
    {
      id: "l7",
      title: "7. Affine Geometry",
      subtopics: [
         { id: "l7-1", label: "Sums of Subspaces: Direct Sums U ⊕ V, dimensions" },
         { id: "l7-2", label: "Affine Subspaces: P + U, intersections" }
      ]
    },
    {
      id: "l8",
      title: "8. Norms & Inner Product Spaces",
      subtopics: [
         { id: "l8-1", label: "Norms & Metrics: Euclidean ||x||_2, p-norms ||x||_p" },
         { id: "l8-2", label: "Inner Products: Real/Complex, Cauchy-Schwarz" },
         { id: "l8-3", label: "Orthogonality: Complements U^⊥, ONB" },
         { id: "l8-4", label: "Gram-Schmidt Algorithm" }
      ]
    },
    {
      id: "l9",
      title: "9. Determinants & Least Squares",
      subtopics: [
         { id: "l9-1", label: "Determinants: Laplace Expansion, Vector Cross Product" },
         { id: "l9-2", label: "Matrix Adjoints: Conjugate Transpose A*, Hermitian" },
         { id: "l9-3", label: "Least Squares: Normal Equations A*Ax = A*b" }
      ]
    },
    {
      id: "l10",
      title: "10. Eigenvalues & Matrix Theory",
      subtopics: [
         { id: "l10-1", label: "Eigen-Analysis: Eigenvalues λ, Eigenvectors v" },
         { id: "l10-2", label: "Multiplicities: Algebraic vs Geometric" },
         { id: "l10-3", label: "Transformations: Similarity, Spectral Theorem" },
         { id: "l10-4", label: "Definiteness: PD and PSD matrices" }
      ]
    }
  ],
  exercises: [
    {
      id: "e1",
      title: "1. Logic & Sets",
      subtopics: [
        { id: "e1-1", label: "Truth Tables & Equivalences - Sheet 1: Ex 1, 4, 5" },
        { id: "e1-2", label: "Quantifiers & Translation - Sheet 1: Ex 2, 7; Sheet 3: Ex 3" },
        { id: "e1-3", label: "Set Operations - Sheet 2: Ex 1, 4; Sheet 1: Ex 8" },
        { id: "e1-4", label: "Function Mapping - Sheet 2: Ex 2, 3, 5, 6" }
      ]
    },
    {
      id: "e2",
      title: "2. Inequalities & Complex Numbers",
      subtopics: [
        { id: "e2-1", label: "Absolute Value & Inequality - Sheet 3: Ex 2, 4" },
        { id: "e2-2", label: "Complex Numbers Forms/Eqs - Sheet 4: Ex 1-4" },
        { id: "e2-3", label: "Mock Exam Alert: Q1a (Division/powers)", isMockAlert: true }
      ]
    },
    {
      id: "e3",
      title: "3. Induction & Polynomials",
      subtopics: [
        { id: "e3-1", label: "Math Induction Proofs - Sheet 5: Ex 1, 4" },
        { id: "e3-2", label: "Mock Exam Alert: Q2a (Induction with i)", isMockAlert: true },
        { id: "e3-3", label: "Horner's Scheme - Sheet 5: Ex 2, 5, 6" },
        { id: "e3-4", label: "Mock Exam Alert: Q1c & Q2b (Roots)", isMockAlert: true }
      ]
    },
    {
      id: "e4",
      title: "4. Vector Spaces & Linear Maps",
      subtopics: [
        { id: "e4-1", label: "Subspace Testing - Sheet 6: Ex 1, 4" },
        { id: "e4-2", label: "Independence, Span & Basis - Sheet 6: Ex 2, 3, 5, 6" },
        { id: "e4-3", label: "Basis Completion - Sheet 7: Ex 1, 5" },
        { id: "e4-4", label: "Matrix Representation M(f) - Sheet 7: Ex 3, 4, 7, 8 (Priority)", isMockAlert: true },
        { id: "e4-5", label: "Fundamental Dimensions - Sheet 8: Ex 1, 4, 5" }
      ]
    },
    {
      id: "e5",
      title: "5. Linear Systems & Gaussian Elimination",
      subtopics: [
        { id: "e5-1", label: "Parametric Systems - Sheet 8: Ex 2; Sheet 9: Ex 2, 3" },
        { id: "e5-2", label: "Solution Count (0, 1, ∞) - Sheet 8: Ex 6" },
        { id: "e5-3", label: "Full RREF Procedure - Sheet 9: Ex 1, 4" }
      ]
    },
    {
      id: "e6",
      title: "6. Affine Geometry",
      subtopics: [
        { id: "e6-1", label: "Parametric Lines/Planes - Sheet 10: Ex 2, 4" },
        { id: "e6-2", label: "Direct Sums U ⊕ V - Sheet 10: Ex 3, 5" }
      ]
    },
    {
      id: "e7",
      title: "7. Norms, Inner Products",
      subtopics: [
        { id: "e7-1", label: "p-Norms & Convexity - Sheet 11" },
        { id: "e7-2", label: "Inner Products - Sheet 12: Ex 1, 2, 5" },
        { id: "e7-3", label: "Gram-Schmidt Projections - Sheet 12: Ex 3, 6" }
      ]
    },
    {
      id: "e8",
      title: "8. Determinants & Least Squares",
      subtopics: [
        { id: "e8-1", label: "Cross Product. Mock Alert: Q1b", isMockAlert: true },
        { id: "e8-2", label: "Determinant Invertibility - Sheet 13: Ex 3, 4. Mock Alert: Q1e", isMockAlert: true },
        { id: "e8-3", label: "Least Squares Optimization - Sheet 13. Mock Alert: Q3a & Q3b", isMockAlert: true }
      ]
    },
    {
      id: "e9",
      title: "9. Eigenvalues & Matrix Theory",
      subtopics: [
        { id: "e9-1", label: "Characteristic Poly. Mock Alert: Q1d", isMockAlert: true },
        { id: "e9-2", label: "Theoretical Eigen-Properties - Sheet 14" },
        { id: "e9-3", label: "Positive Definiteness Check. Mock Alert: Q4", isMockAlert: true }
      ]
    }
  ],
  mocks: [
    {
      id: "m1",
      title: "Question 1: Rapid Tests",
      subtopics: [
        { id: "m1-1", label: "Complex Number division, conjugation, exponentiation" },
        { id: "m1-2", label: "Parametric Cross Product (u × v with λ)" },
        { id: "m1-3", label: "Polynomial Substitutions (y = x^5)" },
        { id: "m1-4", label: "Eigenvalue Inspection (Diagonal/Triangular matrices)" },
        { id: "m1-5", label: "Invertibility Analysis (det(A) ≠ 0 with parameters)" }
      ]
    },
    {
      id: "m2",
      title: "Question 2: Formal Proofs",
      subtopics: [
        { id: "m2-1", label: "Complex Math Induction (Summations with imaginary i)" },
        { id: "m2-2", label: "Multiplicity & Double Roots (p(x)=0, p'(x)=0)" }
      ]
    },
    {
      id: "m3",
      title: "Question 3: Least Squares",
      subtopics: [
        { id: "m3-1", label: "Convert complex error function (Σ) into matrix norm ||Ax - b||^2" },
        { id: "m3-2", label: "Solve Normal Equations (A*Ax = A*b)" }
      ]
    },
    {
      id: "m4",
      title: "Question 4: Comprehensive Matrix Theory",
      subtopics: [
        { id: "m4-1", label: "Calculate Determinant det(A)" },
        { id: "m4-2", label: "Find Rank(A)" },
        { id: "m4-3", label: "Compute Kernel dimension and Basis" },
        { id: "m4-4", label: "Eigenvector Verification (Av = λv)" },
        { id: "m4-5", label: "Definiteness Proof (all λ > 0 -> PD)" }
      ]
    }
  ]
};
