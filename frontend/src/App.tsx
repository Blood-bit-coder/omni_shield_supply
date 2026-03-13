import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Transfers from './pages/Transfers'
import Analytics from './pages/Analytics'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App