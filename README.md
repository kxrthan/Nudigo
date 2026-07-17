<div align="center">
  <img src="public/logo.png" alt="Nudigo Logo" width="100" />
  <h1>Nudigo</h1>
  <p><strong>The ultimate toolkit to convert bouncing visitors into paying customers using social proof popups.</strong></p>
</div>

---

## 🚀 Overview
Nudigo is a powerful SaaS platform that allows you to easily create and embed FOMO (Fear Of Missing Out) and social proof popups on any website. Drive urgency, build trust, and skyrocket your conversion rates with just a simple script tag.

## ✨ Features
- **Instant Social Proof:** Show recent sales, signups, or custom messages (e.g., "Gym Chad just joined").
- **Seamless Integration:** Embed your campaigns into HTML, Next.js, React, Webflow, or WordPress with a single line of code.
- **Customizable Themes:** Match your brand identity with customizable light/dark themes and accent colors.
- **Timing Controls:** Fully configure initial delays, message intervals, and display durations.
- **Analytics Dashboard:** Track visitors and views across all your popup campaigns in real time.
- **Mobile Optimized:** A fully responsive dashboard and popup engine for seamless cross-device experiences.

## 🛠 Tech Stack
- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Charts:** [Recharts](https://recharts.org/)

## 🏎 Performance Optimizations
Nudigo has been heavily optimized for blazing-fast load times:
- **Server Components:** Dashboard data is fetched server-side for zero-layout-shift and instantaneous rendering.
- **Code Splitting:** Heavy libraries like Recharts are dynamically imported so they don't block the main thread.
- **Image Optimization:** Utilizes `next/image` to serve lightweight, responsive WebP/AVIF images.

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed. You will also need a Supabase project for the database and authentication.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nudigo.git
   cd nudigo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your Supabase keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment
The easiest way to deploy your Nudigo app is to use the [Vercel Platform](https://vercel.com/new).

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
