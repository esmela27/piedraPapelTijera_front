import { useEffect, useState } from 'react';
import axios from 'axios';

function Ejemplo() {

  const [datos, setDatos] = useState([])

  useEffect(() => {
    axios.get("https://localhost:7059/WeatherForecast")
    .then((respuesta)=>{
      console.log(respuesta.data)
      setDatos(respuesta.data);
    })

  }, [])
  return (
    <div >
      <h1>Datos:</h1>
      <ul>
        {datos.map((dato, index) => (
          <li key={index}>{dato.summary}</li>
        ))}
      </ul>
   
    </div>
  );
}

export default Ejemplo;