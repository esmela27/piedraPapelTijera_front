
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Inicio'; // Crea este componente según tus necesidades
import Juego from './Juego';

const App = () => {
  const [mostrarBoton, setMostrarBoton] = useState(false);
  return (
    <div className='App' >
   
    <Router>
      <Routes>
        <Route path="/" element={<Inicio setMostrarBoton={setMostrarBoton}/>} />
        <Route path="/Juego" element={<Juego mostrarBoton={mostrarBoton} />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
