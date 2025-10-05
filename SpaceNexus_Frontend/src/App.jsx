import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './components/pages/Home'
import { BackgroundParticles } from './components/BackgroundParticles';
import { KnowledgeGraph } from './components/pages/KnowledgeGraph';
import { Test } from './components/pages/Test';
import ArticleView from './components/pages/AbstractPage';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <BackgroundParticles />
      <Routes>
        {/*<ArticleView rol="Cientifico" nombre="Artículo A" />*/}
        {/*<ArticleView rol="Inversor" nombre="Artículo B" />*/}
        <Route path="/Home" element={<Home />} />
        <Route path='/KnowledgeGraph' element={<KnowledgeGraph />} />
        <Route path='/Test' element={<Test />} />
        <Route path='/KnowledgeGraph/:user' element={<KnowledgeGraph />} />
        <Route path='/Article' element={<ArticleView rol="Astronauta" nombre="Artículo C" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
