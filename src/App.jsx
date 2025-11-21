import React from 'react'
import NavbarApp from './components/NavbarApp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import FooterApp from './components/FooterApp'
import SmartphoneScreen from './pages/SmartphoneScreen'
import GpuScreen from './pages/GpuScreen'
import CpuScreen from './pages/CpuScreen'
import MotherScreen from './pages/MotherScreen'
import NotebooksScreen from './pages/NotebooksScreen'
import RamMemoryScreen from './pages/RamMemoryScreen'
import PowerSuppliesScreen from './pages/PowerSuppliesScreen'
import PeripheralsScreen from './pages/PeripheralsScreen'
import CasesScreen from './pages/CasesScreen'
import CrudProducstApp from './components/CrudProductsApp'

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
        <Route path='/Notebooks' element={<NotebooksScreen />} />
        <Route path='/MemoriasRam' element={<RamMemoryScreen />} />
        <Route path='/FuentesDeAlimentacion' element={<PowerSuppliesScreen />} />
        <Route path='/Perifericos' element={<PeripheralsScreen />} />
        <Route path='/Gabinetes' element={<CasesScreen />} />
        <Route path='/crud' element={<CrudProducstApp />} />
      </Routes>
      <FooterApp />
    </BrowserRouter>
  )
}

export default App
