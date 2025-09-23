import { useState } from 'react'
import { BrowserRouter, Router, Route, Routes, useNavigate } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/details/Sidebar'
import MotorList from './pages/owner/MotorList'
import AddMotor from './pages/owner/AddMotor'

function App() {
  return (
    <BrowserRouter>
    <div className='flex flex-row'>
      <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/MotorList" element={<MotorList />} />
          <Route path="/AddMotor" element={<AddMotor/>} />
        </Routes>
    </div>
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