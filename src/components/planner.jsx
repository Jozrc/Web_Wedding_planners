import React from "react";
import { Link } from 'react-router-dom';
import './Styles/planner.css';
import boda from "./images/boda.jpeg"
import anillo from "./images/anillos.png"


const Planner = () => {
    return (
    
<section class="container-plannerperfil">

    <div className="box">
<div className="containerTitulo">
    <h1 className="titulo">Titulo Planner</h1> 
    <img className="bodaIcon" src={[anillo]} alt="" />
</div>

    <img className="imgBoda" src={[boda]} alt="" />

    <div className="descricion-box">

    <h2 className="titulo">Sub-titulo</h2>

   <div className="informacion">

    <h3 className="infoSubTitulo">Informacion</h3>
    <p>toda la descriipcion necesaria para el evento</p>

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

   </div>
   

   </div>

<div className="descricion-box">

<ul className="opciones-planner">
    <Link to="/perfil"><li>Contacto</li></Link>
    <Link to="/carrito"><li>Reservacion</li></Link>
    <li>Ayuda</li>
  </ul>

</div>

    </div>

</section>

    );
  };
  
  export default Planner