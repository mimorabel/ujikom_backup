import { useState } from 'react'
import { BrowserRouter, Router, Route, Routes, useNavigate } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/details/Sidebar'
import MotorList from './pages/owner/MotorList'
import AddMotor from './pages/owner/AddMotor'
import Register from './pages/auth/Register'
import LoginPage from './pages/auth/LoginPage'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/MotorList" element={<MotorList />} />
          <Route path="/AddMotor" element={<AddMotor/>} />
          <Route path="/Register" element={<Register />} />
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