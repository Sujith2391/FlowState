# FlowState AI 🚀

A premium, enterprise-grade AI productivity and collaboration SaaS platform built with the MERN stack. Designed with a dark-mode-first, minimal UI/UX inspired by Linear, Notion, and Vercel.

## ✨ Features
*   **Cinematic Landing Page:** Immersive `StoryScroll` built with GSAP and a custom Spooky Smoke Canvas animation.
*   **Real-time Collaboration:** Drag-and-drop Kanban board seamlessly synced across users in real-time via `Socket.io`.
*   **Gemini AI Assistant:** Upload meeting notes, and let the AI instantly parse the transcript, generate prioritized tasks, and populate your Kanban board.
*   **Workspace Isolation:** Full JWT-based authentication and team workspace management for enterprise privacy.
*   **Live Analytics:** Real-time productivity metrics driven by MongoDB Aggregation pipelines visualized beautifully with Recharts.

## 🛠 Tech Stack
*   **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP, Zustand.
*   **Backend:** Node.js, Express.js, MongoDB Atlas.
*   **Realtime:** Socket.io.
*   **AI Engine:** Google Gemini API (`@google/genai`).

## 🚀 Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/FlowState-AI.git
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `/backend` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   GEMINI_API_KEY=your_google_gemini_key
   FRONTEND_URL=http://localhost:5173
   ```
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the `/frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   Start the frontend:
   ```bash
   npm run dev
   ```

## 🌐 Deployment
*   **Frontend:** Ready to deploy to [Vercel](https://vercel.com). The repository includes a `vercel.json` config for React Router fallback support.
*   **Backend:** Ready to deploy to [Render](https://render.com) or [Railway](https://railway.app). Ensure CORS origins are updated in your environment variables.

---
*Designed & Engineered for maximum productivity.*
