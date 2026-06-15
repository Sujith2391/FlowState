import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import { Landing } from './pages/Landing'
import { Dashboard } from './pages/Dashboard'
import { IssuesView } from './pages/IssuesView'
import { Analytics } from './pages/Analytics'
import { Auth } from './pages/Auth'
import { Inbox } from './pages/Inbox'
import { Documents } from './pages/Documents'
import { Team } from './pages/Team'
import { Settings } from './pages/Settings'
import { Views } from './pages/Views'

// Global Axios Interceptor for JWT
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Simple protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('token')
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="issues" replace />} />
          <Route path="issues" element={<IssuesView />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="documents" element={<Documents />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} />
          <Route path="views" element={<Views />} />
          <Route path="*" element={<div className="flex h-full w-full items-center justify-center p-10 text-gray-400">This view is under construction.</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
