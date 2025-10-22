import React from 'react'
import NavbarApp from './components/NavbarApp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import FooterApp from './components/FooterApp'
import SmartphoneScreen from './pages/SmartphoneScreen'
import GpuScreen from './pages/GpuScreen'
import CpuScreen from './pages/CpuScreen'
import MotherScreen from './pages/MotherScreen'

const App = () => {
  return (
    <BrowserRouter>
      <NavbarApp />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/smartphones' element={<SmartphoneScreen />} />
        <Route path='/PlacasDeVideo' element={<GpuScreen />} />
        <Route path='/Procesadores' element={<CpuScreen />} />
        <Route path='/Mothers' element={<MotherScreen />} />
      </Routes>
      <FooterApp />
    </BrowserRouter>
  )
}

export default App
