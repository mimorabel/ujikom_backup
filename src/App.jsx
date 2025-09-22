import { useState } from 'react'
import { BrowserRouter, Router, Route, Routes, useNavigate } from 'react-router-dom'
import './index.css'
import LoginPage from './pages/auth/LoginPage'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/details/Sidebar'
import Register from './pages/auth/Register'

function App() {
  return (
    <BrowserRouter>
      <Register/>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
)
}

export default App

{/*<BrowserRouter>
    <div className='flex flex-cols'>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
    </BrowserRouter>*/}

    {/*<BrowserRouter>
    <div className='flex flex-cols'>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
    </BrowserRouter>
  */}