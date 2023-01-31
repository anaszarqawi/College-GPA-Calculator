import React from 'react';
import CalcContextProvider from './contexts/calcContext';

// Components
import Header from './components/header-footer/header';
import Footer from './components/header-footer/footer';

// Styles
import './common/constants.scss';
import './App.scss';
import Cards from './components/Cards/Cards';

function App() {
  return (
    <CalcContextProvider>
      <Header />
      <Cards />
      <Footer />
    </CalcContextProvider>
  );
}

export default App;
