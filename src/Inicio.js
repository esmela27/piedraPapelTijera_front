import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import Cabecera from './Cabecera';
import Play from './img/play.png'
import './Inicio.css'

const Inicio = ({ setMostrarBoton }) => {

    const handleClick = () => {
        setMostrarBoton(true);
      };

  return (
    <>
    <Cabecera />
    <div className="d-flex justify-content-center align-items-center vh-100 fondoInicio">
        <div className="mb-30">
      <Link to="/Juego">
    
      <Button variant="warning" onClick={handleClick}><img src={Play} alt="Descripción de la imagen" /></Button>
     
      </Link>
      </div>
    </div>
    </>
  );
};

export default Inicio;