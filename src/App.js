import { createContext, useState } from 'react';
import './App.css';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Logo from './components/logo/Logo';
import Navigation from './components/navigation/Navigation';
import Rank from './components/rank/Rank';
import Context, { ContextProvider } from './components/ContextProvider';
import Signin from './components/signin/Signin';
import { Route, Routes } from "react-router-dom";
import Register from './components/register/Register';
import Design from './components/design/Design'


function App() {

  return (
    <ContextProvider>
      <Design />
      <Routes>
        <Route path='/' element={<Signin/>} />
        <Route path='/detect' element={
          <div className='App'>
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm />
          </div>
        } />
        <Route path='/register' element={<Register />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
