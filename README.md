# FAU Erlangen Math 1 Checklist

A highly optimized, professional web application designed specifically for tracking study progress in the **2026 Mathematics 1 (Math 1) course at FAU Erlangen (Friedrich-Alexander-Universität Erlangen-Nürnberg)**.

Built with an ultra-minimalist, developer-focused aesthetic (Linear/Vercel style), this tool breaks down the entire semester's curriculum—including Lectures, Exercise Sheets, and Mock Exams—into granular, interactive checklists.

## Features

- **Granular Curriculum Tracking:** The entire 2026 Math 1 syllabus is digitized into structured tabs (Lectures, Exercises, Mock Exams).
- **Intelligent Checklists:** Tracking nested subtopics. Completing all subtopics automatically strikes out the parent topic with visual feedback.
- **Mock Exam Alerts:** Critical topics that are highly likely to appear on the final exam are distinctly highlighted in the UI.
- **Zero-Config Persistent Sync:** User progress is natively synced to the cloud using Supabase Auth's `user_metadata` object, requiring no external database schema. Progress is saved permanently across devices.
- **Frictionless Demo Access:** Includes a 1-click Demo Login system for instantaneous access and testing.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3 (Pure Dark Mode Theme)
- **Backend & Auth:** Supabase

## Setup & Deployment

This project requires environment variables to connect to its Supabase backend.

1. Clone the repository.
2. Provide standard Supabase keys in a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

*Note: The project does not require any Postgres tables to be created. It exclusively leverages the Auth service's `user_metadata` for state persistence.*
