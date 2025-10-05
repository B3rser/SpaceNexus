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
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <BrowserRouter>
      <BackgroundParticles />
      <UserProvider>
        <Routes>
          {/*<ArticleView rol="Cientifico" nombre="Artículo A" />*/}
          {/*<ArticleView rol="Inversor" nombre="Artículo B" />*/}
          <Route path="/" element={<Welcome key="welcome" />} />
          <Route path="/welcome" element={<Welcome key="welcome" />} />
          <Route path="/select-role/:role" element={<SelectRole />} />
          <Route path="/home" element={<Home />} />
          <Route path='/knowledgeGalaxy' element={<KnowledgeGraph />} />
          <Route path='/test' element={<Test />} />
          <Route path='/knowledgeGalaxy/:name' element={<KnowledgeGraph />} />
          { /*<Route path='/article' element={<ArticleView rol="Astronauta" nombre="Artículo C" />} />*/}
          <Route path="/article/:articleId" element={<ArticleView />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App
