import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './components/pages/Home'
import { BackgroundParticles } from './components/BackgroundParticles';
import ArticleView from './components/pages/AbstractPage';

import './App.css'

function App() {
  return (
    <>
      {/*<ArticleView rol="Cientifico" nombre="Artículo A" />*/}
      {/*<ArticleView rol="Inversor" nombre="Artículo B" />*/}
      <ArticleView rol="Astronauta" nombre="Artículo C" />
    </>
  );
}

export default App
