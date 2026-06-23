# SplitSmart

SplitSmart is a modern, mobile-first fintech web application designed for seamlessly splitting expenses among friends, roommates, and travel groups. 

Built with a stunning **Glassmorphism** aesthetic, SplitSmart focuses on an excellent user experience while maintaining robust database security.

## Features
- **Secure Authentication:** Email & password authentication with unique `SS-XXXXXX` public profile identifiers.
- **Group Management:** Create groups and securely invite members using their public IDs.
- **Expense Tracking:** Add expenses to groups with automatic "Equal Split" calculations.
- **Real-time Ledgers:** Instantly see who owes what and track net balances.
- **Glassmorphism UI:** Built with TailwindCSS for a premium, blur-heavy aesthetic.

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, Lucide React Icons
- **Backend/Database:** Supabase (PostgreSQL), Row-Level Security (RLS), Postgres Triggers
- **Routing:** React Router

## Getting Started

1. **Clone the repository**
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment:**
   Ensure you have a `.env` file at the root with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```
4. **Run Development Server:**
   ```bash
   npm run dev
   ```

## Security
This application utilizes strict **Supabase Row-Level Security (RLS)**. Users can only fetch and view groups they are explicitly a member of, ensuring total financial privacy.

<!-- Streak maintained on 2026-06-23 -->
