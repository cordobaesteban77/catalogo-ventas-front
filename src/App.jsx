import React from 'react'
import NavbarApp from './components/NavbarApp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import FooterApp from './components/FooterApp'

const App = () => {
  return (
    <BrowserRouter>
      <NavbarApp />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
      </Routes>
      <FooterApp />
    </BrowserRouter>
  )
}

export default App
