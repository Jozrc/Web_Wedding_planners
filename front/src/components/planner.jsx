import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Styles/planner.css';
import boda from "./images/boda.jpeg"
import anillo from "./images/anillos.png"

let paso = false;

const Planner = () => {
    const params = useParams();

    let idPaquete = params.idPaquete;

    const [TituloPaq, setTituloPaq] = useState('');
    const [DescripcionPaq, setDescripcionPaq] = useState('');
    const [PrecioPaq, setPrecioPaq] = useState('');
    const [CapacidadPaq, setCapacidadPaq] = useState('');

    const mostrarPaquete = () => {
        axios.post("http://localhost:3001/MostrarPaqueteByID", {
            idPaquete: idPaquete,
        }).then((response)=>{
            if(response.data[0].length > 0){
                let resultado = response.data[0];
                resultado = resultado[0];

                setTituloPaq(resultado.Titulo_Paquete);
                setDescripcionPaq(resultado.Descripcion_Paquete);
                setPrecioPaq(resultado.Precio_Paquete);
            };
        })
    };

    if(!paso){
        mostrarPaquete();
        paso = true;
    }

    return (
    
<section class="container-plannerperfil">

    <div className="box">
<div className="containerTitulo">
    <h1 className="titulo">{TituloPaq}</h1> 
    <img className="bodaIcon" src={[anillo]} alt="" />
</div>

    <img className="imgBoda" src={[boda]} alt="" />

    <div className="descricion-box">

    <h2 className="titulo">Informacion del paquete</h2>

   <div className="informacion">

    <h3 className="infoSubTitulo">Descripción</h3>
    <p>{DescripcionPaq}</p>

    <h3 className="infoSubTitulo">Servicios que ofrece</h3>

    <ul>
        <li>servicio 1</li>
        <li>servicio 2</li>
        <li>servicio 3</li>
        <li>servicio 4</li>
        <li>servicio 5</li>
    </ul>

    <h3 className="infoSubTitulo">Capacidad</h3>
    <p>texto</p>

    <h3 className="infoSubTitulo">Forma de pago</h3>
    <p>texto</p>

    <h3 className="infoSubTitulo">Precio del Paquete</h3>
    <p>{PrecioPaq}</p>

   </div>
   

   </div>

<div className="descricion-box">

<ul className="opciones-planner">
    <Link to="/perfil"><li>Contacto</li></Link>
    <Link to={"/carrito/" + idPaquete}><li>Reservacion</li></Link>
    <li>Ayuda</li>
  </ul>

</div>

    </div>

</section>

    );
  };
  
  export default Planner