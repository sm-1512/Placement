import React, { use, useEffect } from 'react'
import Navbar from './components/Navbar'
import  {Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import SettingsPage from "./pages/SettingsPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import MessagePage from "./pages/MessagePage.jsx"
import BlogsPage from "./pages/BlogsPage.jsx"
import { useAuthStore } from './store/useAuthStore.js'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/messages" element={authUser? <MessagePage /> : <Navigate to="/login" />} />
        <Route path="/blogs" element={authUser? <BlogsPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App