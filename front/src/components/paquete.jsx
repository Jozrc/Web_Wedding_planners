import React, { useState } from "react";
import { Link } from 'react-router-dom';
import miImagen from "./images/banmer.jpg";
import './Styles/index.css';

const Paquete = ({paquete}) => {
    const [ampliarImagen, setAmpliarImagen] = useState(false);

    const toggleAmpliar = () => {
        setAmpliarImagen(!ampliarImagen);
    };

    return(
        <div className="planner">
      
            <div id="imagen-contenedor" onClick={toggleAmpliar}>
            <img
            src={miImagen}
            alt="Descripción de la imagen" 
            id="imagen" 
            className={`imagen-planner ${ampliarImagen ? "ampliada" : ""}`} // Aplica el estilo de zoom a la imagen
            />
            </div>

            <h1 className="titulo-planner">{paquete.Titulo}</h1>
            <h5 className="subtitulo-planner">Informacion del paquete:</h5>
            <p className="descripcion">{paquete.Descripcion}</p>
            <h5 className="subtitulo-planner">Costo</h5>
            <p className="descripcion"> $ {paquete.Precio} </p>
            <Link to={"/planner/" + paquete.id_Paquete}><button className="button-planner">Ver más</button></Link>
            
        </div>
    )
}

export default Paquete