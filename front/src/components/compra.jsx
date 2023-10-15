import React from "react";
import { Link } from 'react-router-dom'
import imgCompra from "./images/banmer.jpg"

const Compra = () =>{
    return(
        <div className="fondo">
        <div className="planner">
        <div id="imagen-contenedor">
        <img
          src={[imgCompra]}
          alt="Descripción de la imagen" 
          id="imagen" 
          className= "imagen-planner"// Aplica el estilo de zoom a la imagen
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
        <div id="imagen-contenedor">
        <img
          src={[imgCompra]}
          alt="Descripción de la imagen" 
          id="imagen" 
          className= "imagen-planner"// Aplica el estilo de zoom a la imagen
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
    );
};

export default Compra