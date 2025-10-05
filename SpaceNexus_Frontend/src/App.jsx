import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './components/pages/Home'
import { BackgroundParticles } from './components/BackgroundParticles';
import { KnowledgeGraph } from './components/pages/KnowledgeGraph';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <BackgroundParticles />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path='/KnowledgeGraph' element={<KnowledgeGraph />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
