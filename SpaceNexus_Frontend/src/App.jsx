import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './components/pages/Home'
import { BackgroundParticles } from './components/BackgroundParticles';
import { KnowledgeGraph } from './components/pages/KnowledgeGraph';
import { Test } from './components/pages/Test';
import Welcome from './components/pages/Welcome';
import SelectRole from './components/pages/ProfileSelectPage';
import ArticleView from './components/pages/AbstractPage';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <BackgroundParticles />
      <Routes>
        {/*<ArticleView rol="Cientifico" nombre="Artículo A" />*/}
        {/*<ArticleView rol="Inversor" nombre="Artículo B" />*/}
        <Route path="/" element={<Welcome key="welcome" />} />
        <Route path="/welcome" element={<Welcome key="welcome" />} />
        <Route path="/select-role/:role" element={<SelectRole />} />
        <Route path="/home" element={<Home />} />
        <Route path='/knowledgeGalaxy' element={<KnowledgeGraph />} />
        <Route path='/test' element={<Test />} />
        <Route path='/knowledgeGalaxy/:user' element={<KnowledgeGraph />} />
        <Route path='/article' element={<ArticleView rol="Astronauta" nombre="Artículo C" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
