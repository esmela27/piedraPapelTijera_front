import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function BotonReinicio() {
    const [show, setShow] = useState(true);

    return (
        <>
         <Alert show={show} variant="success">
        <Alert.Heading>My Alert</Alert.Heading>
        <p>
          ¿Desea reiniciar el juego?
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Cancelar
          </Button>
          <Button onClick={() => setShow(false)} variant="outline-success">
            Aceptar
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}

        </>
    );
}

export default BotonReinicio;