
import React, { useState, useEffect, useCallback} from 'react';
import Cabecera from './Cabecera';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import './Juego.css'
import Piedra from './img/piedra.png'
import { Button } from 'react-bootstrap';
import Papel from './img/papel.png'
import Tijera from './img/tijera.png'
import A from './img/a.png'
import W from './img/w.png'
import D from './img/d.png'
import P from './img/p.png'
import I from './img/i.png'
import O from './img/o.png'

const Juego = ({ mostrarBoton }) => {
    const [resultado, setResultado] = useState([]);
    const [jugadaUsuario1, setJugadaUsuario1] = useState('');
    const [jugadaUsuario2, setJugadaUsuario2] = useState('');
    const [marcador1, setMarcador1] = useState('0');
    const [marcador2, setMarcador2] = useState('0');
    const [seleccionado1, setSeleccionado1] = useState(false);
    const [seleccionado2, setSeleccionado2] = useState(false);
    const [movimiento1, setMovimiento1] = useState('');
    const [movimiento2, setMovimeinto2] = useState('');
    const [mostrarOverlay, setMostrarOverlay] = useState(false);
    const [mostrarOverlayJugada, setMostrarOverlayJugada] = useState(false);
    const [ganador, setGanador] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
      const handleBeforeUnload = () => {
        // Almacenar el indicador en localStorage antes de recargar la página
        localStorage.setItem('reloadIndicator', 'true');
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);

    useEffect(() => {
        console.log(seleccionado1, movimiento1);
        seleccionarJugada();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seleccionado1, movimiento1]);
    useEffect(() => {
        console.log(seleccionado2, movimiento2);
        seleccionarJugada();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seleccionado2, movimiento2]);

    const mostrarOverlayTemporal = () => {
        setMostrarOverlayJugada(true);
    
        // Oculta el overlay después de 3 segundos
        setTimeout(() => {
          setMostrarOverlayJugada(false);
        }, 3000);
      };

    const toggleOverlay = () => {
        setMostrarOverlay(!mostrarOverlay);
    };
    const iniciar = async () => {
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

    const realizarJugada = async (jugada1, jugada2) => {
        try {
            const response = await axios.get(`https://localhost:7059/api/juego?jugadaUsuario1=${jugada1}&jugadaUsuario2=${jugada2}`);
            const data = response.data;
            const datos = JSON.parse(data.resultadoFinal)
            console.log(datos)
            setResultado(datos);
            setJugadaUsuario1(data.jugadaUsuario1);
            setJugadaUsuario2(data.jugadaUsuario2);
            setMarcador1(datos.puntos1);
            setMarcador2(datos.puntos2);
            console.log(datos.puntos1)
            setSeleccionado1(false)
            setMovimiento1('')
            setMovimeinto2('')
            setSeleccionado2(false)
            comprobarGanador(datos.ganador1, datos.ganador2)
            mostrarOverlayTemporal()
        } catch (error) {
            console.error('Error al realizar la jugada:', error);
        }
    };
    const comprobarGanador = (win1, win2) => {
        if (win1 === true) {
            setGanador('Jugador 1')
            toggleOverlay();
        }
        if (win2 === true) {
            setGanador('Jugador 2')
            toggleOverlay();
        }

    }

    const seleccionarJugada = () => {
        if (seleccionado1 && seleccionado2) {
            realizarJugada(movimiento1, movimiento2)
        }

    };

    const seleccionar1 = useCallback((elegido1) => {
        setSeleccionado1(true);
        setMovimiento1(elegido1);
    }, []);

    const seleccionar2 = useCallback((elegido2) => {
        setSeleccionado2(true);
        setMovimeinto2(elegido2);
    }, []);
    const handleKeyDown = useCallback((event) => {
        const key = event.key;

        if ((key === 'w' || key === 'a' || key === 'd')) {
            console.log(`Se presionó la tecla "${key}" para el Jugador 1`);
            if (key === 'w') {
                seleccionar1('piedra');
            } else if (key === 'a') {
                seleccionar1('papel');
            } else if (key === 'd') {
                seleccionar1('tijera');
            }
        }

        if ((key === 'ArrowUp' || key === 'ArrowRight' || key === 'ArrowLeft')) {
            console.log(`Se presionó la tecla "${key}" para el Jugador 2`);
            if (key === 'ArrowUp') {
                seleccionar2('piedra');
            } else if (key === 'ArrowRight') {
                seleccionar2('papel');
            } else if (key === 'ArrowLeft') {
                seleccionar2('tijera');
            }
        }
    }, [seleccionar1, seleccionar2]);

    useEffect(() => {
        const handleKeyDownLocal = (event) => {
            handleKeyDown(event);
        };


        // Agregar event listener al montar el componente
        window.addEventListener('keydown', handleKeyDownLocal);

        // Limpiar event listener al desmontar el componente
        return () => {
            window.removeEventListener('keydown', handleKeyDownLocal);
        };
    }, [handleKeyDown]);



    return (
        <div className='fondo' onKeyDown={handleKeyDown} tabIndex="0" >
            <Cabecera mostrarBoton={mostrarBoton} />
            {/* 
            {jugadaUsuario1 && <p>Jugador 1: {jugadaUsuario1}</p>}
            {jugadaUsuario2 && <p>Jugador 2: {jugadaUsuario2}</p>} 
           {resultado && <p>Resultado: {resultado.resultado}</p>}*/}
            <div className="miComponente pantalla-dividida">
                <div className="row">


                    <div className="col-md-6 s">
                        <h2 className='letra'>Jugador 1</h2>
                        <h1 className='letra'>{marcador1}</h1>

                    </div>

                    <div className="col-md-6 ">
                        <h2 className='letra'>Jugador 2</h2>
                        <h1 className='letra'>{marcador2}</h1>

                    </div>
                </div>
                <div className="row">


                    <div className="col-md-6 seccion-izquierda">
                        <div className="row">
                            <div className="column">
                            <img src={A} style={{ width: '100px', height: '100px' }} alt="Descripción de la imagen" />
                                <Button variant="warning" className="btn btn-primary" onClick={() => seleccionar1('piedra')}>
                                    <img src={Piedra} style={{ width: '100px', height: '100px' }} alt="Descripción de la imagen" />
                                </Button>
                            </div>

                        </div>
                        <div className="row">
                      
                            <div className="column">  
                            <img src={W} style={{ width: '100px', height: '100px' }} alt="Descripción de la imagen" />
                                <Button variant="warning" className="btn btn-primary" onClick={() => seleccionar1('tijera')}>
                                    <img src={Tijera} style={{ width: '100px', height: '100px' }} alt="Descripción de la imagen" />
                                </Button>
                            </div>

                        </div>

                        <div className="row">
                      
                            <div className="column"> 
                             <img src={D} style={{ width: '100px', height: '100px' }} alt="Descripción de la imagen" />
                                <Button variant="warning" className="btn btn-primary" onClick={() => seleccionar1('papel')}>
                                    <img src={Papel} style={{ width: '100px', height: '100px' }} alt="Descripción de la imagen" />
                                </Button>
                            </div>

                        </div>

                    </div>
                    <div className="col-md-6 seccion-derecha">
                        <div className="row">
                            <div className="column">
                                <Button variant="warning" className="btn btn-primary" onClick={() => seleccionar2('piedra')}>
                                    <img src={Piedra} style={{ width: '100px', height: '100px' }} alt="Descripción de la imagen" />
                                </Button>
                                <img src={P} style={{ width: '100px', height: '100px' }} alt="Descripción de la imagen" />
                            </div>

                        </div>
                        <div className="row">
                            <div className="column">
                                <Button variant="warning" className="btn btn-primary" onClick={() => seleccionar2('tijera')}>
                                    <img src={Tijera} style={{ width: '100px', height: '100px' }} alt="Descripción de la imagen" />
                                </Button>
                                <img src={I} style={{ width: '100px', height: '100px' }} alt="Descripción de la imagen" />
                            </div>

                        </div>

                        <div className="row">
                            <div className="column">
                                <Button variant="warning" className="btn btn-primary" onClick={() => seleccionar2('papel')}>
                                    <img src={Papel} style={{ width: '100px', height: '100px' }} alt="Descripción de la imagen" />
                                </Button>
                                <img src={O} style={{ width: '100px', height: '100px' }} alt="Descripción de la imagen" />
                            </div>

                        </div>

                    </div>
                </div>

                {mostrarOverlay && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 overlay">
                        <div className="position-absolute top-50 start-50 translate-middle text-white">
                            <h2>Ganador definitivo {ganador} </h2>
                            <ButtonGroup aria-label="Basic example">
                                <Link to="/">
                                    <button className="btn btn-success" onClick={handleClick}>
                                        Reiniciar
                                    </button>
                                </Link>
                            </ButtonGroup>
                        </div>
                    </div>
                )}
                {mostrarOverlayJugada && (
                  <div className="position-absolute top-0 start-0 w-100 h-100 overlay">
                  <div className="position-absolute top-50 start-50 translate-middle text-white">
                    <h2>{jugadaUsuario1} vs {jugadaUsuario2}</h2>
                      <h1>{resultado.resultado}</h1>

                   
                  </div>
              </div>
                )}
            </div>
        </div >
    );
};



export default Juego;