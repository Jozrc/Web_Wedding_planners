import React, { useState } from "react";
import { Link } from 'react-router-dom';
import miImagen from "./images/banmer.jpg";
import './Styles/index.css';

const Paquete = ({paquete}) => {
    const [ampliarImagen, setAmpliarImagen] = useState(false);

    const toggleAmpliar = () => {
        setAmpliarImagen(!ampliarImagen);
    };

    let ruta;

    return(
        <div className="planner">
      
            <div id="imagen-contenedor" onClick={toggleAmpliar}>
            <img
            src={paquete.Imagen}
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
                {
                    paquete.venta==true?
                        <Link to={"/verVenta/" + paquete.id_Paquete + "/" + paquete.IdPaqueteComprado}><button className="button-planner">Ver más</button></Link>
                    :
                        paquete.compra==true?
                            <Link to={"/verCompra/" + paquete.id_Paquete + "/" + paquete.IdPaqueteComprado}><button className="button-planner">Ver más</button></Link>
                        :
                            <Link to={"/planner/" + paquete.id_Paquete}><button className="button-planner">Ver más</button></Link>
                }
        </div>
    )
}

export default Paquete