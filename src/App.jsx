import React from 'react';
import CalcContextProvider from './contexts/calcContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Header from './components/header-footer/header';
import Footer from './components/header-footer/footer';
import Cards from './components/Cards/Cards';

// Styles
import './common/constants.scss';
import './App.scss';

function App() {
  return (
    <CalcContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
        </Routes>
        <Footer />
      </Router>
    </CalcContextProvider>
  );
}

export default App;
