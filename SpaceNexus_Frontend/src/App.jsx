import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './components/pages/Home'
import { BackgroundParticles } from './components/BackgroundParticles';
import Welcome from './components/pages/Welcome';
import SelectRole from './components/pages/ProfileSelectPage';

import './App.css'


function App() {

  return (
    <BrowserRouter>
      <BackgroundParticles />
      <Routes>
        <Route path="/" element={<Welcome key="welcome" />} />
        <Route path="/select-role/:role" element={<SelectRole />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
