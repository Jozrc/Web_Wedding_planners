import React, { useState } from "react";
import { Link } from 'react-router-dom';
import miImagen from "./images/banmer.jpg";
import './Styles/index.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
let idUser = -1;


function HeaderAndFooterExample() {
  //Verificar si existe un usuario logueado
  if(cookies.get('idUser') != null){
    idUser = cookies.get('idUser');
    console.log("idUsuario: " + idUser);
  }
  else{
    idUser = -1;
  }


  const [ampliarImagen1, setAmpliarImagen1] = useState(false);
  const [ampliarImagen2, setAmpliarImagen2] = useState(false);

  const toggleAmpliar1 = () => {
    setAmpliarImagen1(!ampliarImagen1);
  };

  const toggleAmpliar2 = () => {
    setAmpliarImagen2(!ampliarImagen2);
  };

  return (
<div>
    <div className='baner'>
        <h2 className='subt'>
          Welcome
        </h2>
    </div>

<div>
  <ul className="opciones">
    <li>Bodas</li>
    <li>Paquetes</li>
    <li>Ofertas</li>
    <li>Restaurantes</li>
  </ul>
</div>

    <div className='fondo'>
    
     <div className="planner">
      
     <div id="imagen-contenedor" onClick={toggleAmpliar1}>
     <img
       src={miImagen}
       alt="Descripción de la imagen" 
       id="imagen" 
       className={`imagen-planner ${ampliarImagen1 ? "ampliada" : ""}`} // Aplica el estilo de zoom a la imagen
       />
     </div>

     <h1 className="titulo-planner">Titulo-Nombre</h1>
     <h5 className="subtitulo-planner">Informacion de la boda:</h5>
     <p className="descripcion">
     Bienvenidos a "Amor Eterno", un evento mágico diseñado y coordinado por nuestro experimentado equipo
     de wedding planners.</p>
     <h5 className="subtitulo-planner">Costo</h5>
     <p className="descripcion">
      5000$
     </p>
     <Link to="/planner"><button className="button-planner">Ver más</button></Link>
     
     
     </div>

    <div className="planner">

    <div id="imagen-contenedor" onClick={toggleAmpliar2}>
     <img
       src={miImagen}
       alt="Descripción de la imagen" 
       id="imagen" 
       className={`imagen-planner ${ampliarImagen2 ? "ampliada" : ""}`} // Aplica el estilo de zoom a la imagen
       />
     </div>

     <h1 className="titulo-planner">Titulo-Nombre</h1>
     <h5 className="subtitulo-planner">Informacion de la boda:</h5>
     <p className="descripcion">
     Bienvenidos a "Amor Eterno", un evento mágico diseñado y coordinado por nuestro experimentado equipo
     de wedding planners.</p>
     <h5 className="subtitulo-planner">Costo</h5>
     <p className="descripcion">
      5000$
     </p>
     <Link to="/planner"><button className="button-planner">Ver más</button></Link>
     
     </div>

    </div>

</div>
    
  );
}

export default HeaderAndFooterExample;