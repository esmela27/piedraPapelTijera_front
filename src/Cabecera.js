import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Button, ButtonGroup } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cabecera.css'
import Reiniciar from './img/reiniciar.png'

function Cabecera({ mostrarBoton }) {
    const [mostrarOverlay, setMostrarOverlay] = useState(false);

    const toggleOverlay = () => {
        setMostrarOverlay(!mostrarOverlay);
    };

    const iniciar = async() => {
        try {
            const response = await axios.post('https://localhost:7059/api/juego/reiniciar');
            console.log(response.data)
           
        } catch (error) {
            console.error('Error al realizar la jugada:', error);
        }
    };

    const handleClick = () => {
        toggleOverlay();
        iniciar();
    };

    return (
        <>
            <Navbar className="fondoCabe">
                <Container>
                    <Navbar.Brand ><h3 className='letraCabe'>Piedra, papel o tijera</h3></Navbar.Brand>
                    {mostrarBoton && <Navbar.Brand>Piedra, papel o tijera</Navbar.Brand> && <Button variant="warning" onClick={toggleOverlay}><img src={Reiniciar} style={{ width: '50px', height: 'auto' }}  alt="Descripción de la imagen" /></Button>}
                </Container>
            </Navbar>
            {mostrarOverlay && (
                <div className="position-absolute top-0 start-0 w-100 h-100 overlay">
                    {/* Contenido del overlay */}
                    <div className="position-absolute top-50 start-50 translate-middle text-white">
                        <h2>¿Desea reiniciar el juego?</h2>
                        <ButtonGroup aria-label="Basic example">
                            <button className="btn btn-danger" onClick={toggleOverlay}>
                                Cancelar
                            </button>
                            <Link to="/">
                                <button className="btn btn-success" onClick={handleClick}>
                                    Aceptar
                                </button>
                            </Link>
                        </ButtonGroup>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cabecera;