# Tic-Tac-Toe Pro

A modern, responsive, and polished Tic-Tac-Toe game built with Next.js 14 (App Router), React 19, TypeScript, Tailwind CSS, and ShadCN UI. Features dark mode, time travel, animations, and a beautiful UI—ready to impress employers or deploy to production.

## 🚀 Tech Stack
- **React 19**
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ShadCN UI**
- **lucide-react** (icons)
- **clsx** (conditional classNames)
- **framer-motion** (animations)

## ✨ Features
- 3x3 interactive Tic-Tac-Toe board
- Player turn indicator (X / O)
- Winner detection logic
- Draw state handling
- Reset button (Play Again)
- Animated square clicks (scale, fade)
- Highlight winning line (green background)
- Move history (time travel)
- Scoreboard (session wins/draws)
- Dark mode (toggle, system-aware)
- Responsive design (mobile & desktop)
- Modular, scalable code structure

## 📁 Folder Structure
```
/app
  layout.tsx         # Global layout
  page.tsx           # Game page
  /components/
    GameBoard.tsx    # Full grid
    Square.tsx       # Individual tile
    Status.tsx       # Status display
    ResetButton.tsx  # Play again button
    MoveHistory.tsx  # List of previous moves
    ThemeToggle.tsx  # Dark mode toggle
/lib
  utils.ts           # calculateWinner() and helpers
/styles
  globals.css        # Tailwind base
/public
  favicon.ico
```

## 🛠️ How to Run Locally
```bash
npm install
npx shadcn@latest init --yes # If not already initialized
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🌑 Dark Mode
- Toggle with the button in the top-right
- Respects system preference

## 🚀 Deployment
Deploy to Vercel in seconds:
```bash
npx vercel
vercel --prod
```

## 🔗 Live Demo
[Live Demo on Vercel](#) <!-- Replace with your deployed link -->

## 📸 Screenshots & Loom Demo
- ![Screenshot](public/screenshot.png) <!-- Add screenshot -->
- [Loom Demo](#) <!-- Add Loom link -->

---

Built with ❤️ by [Your Name].
