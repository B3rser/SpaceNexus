import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './components/pages/Home'
import { BackgroundParticles } from './components/BackgroundParticles';
import { Test } from './components/pages/Test';

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <BackgroundParticles />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path='/Test' element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
