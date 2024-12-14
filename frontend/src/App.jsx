import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { Loader } from "lucide-react"
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'
function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    console.log("checking auth");
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth && !authUser){
     return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
     )
  }

  console.log("authUser1: ",{authUser});

  return (
    <div data-theme={theme}> 
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
