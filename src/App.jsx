import React from 'react'
import NavbarApp from './components/NavbarApp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'

const App = () => {
  return (
    <BrowserRouter>
      <NavbarApp />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
