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
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
      </Routes>
    </div>
  )
}

export default App