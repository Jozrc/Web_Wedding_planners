import React from "react";
import { Link } from 'react-router-dom';
import './Styles/perfil.css';
import imgPerfil from "./images/perfil.jpg";
import msgPerfil from "./images/msgPerfil.png";
import facebook from "./images/facebook.png";
import instagram from "./images/instagram.png";
import twitter from "./images/twitter.png";


const Perfil = () => {
    return (

        <div className="Perfil">
            <img className="imgPerfil" src={[imgPerfil]} alt="" />
            <h1 className="NombrePerfil"> Nombre Completo</h1>
            <Link to="/chat" ><button class="buttonMsg">
            <span>Enviar Mensaje</span>
            <img src={[msgPerfil]} alt="Imagen" />
            </button> </Link>
            <div className="InfoPerfil">
            <h1 className="RedesTitulo">Redes sociales</h1>
            <div className="RedesCaja">
            <img className="redesImg" src={[facebook]} alt="" />
            <img className="redesImg" src={[instagram]} alt="" />
            <img className="redesImg" src={[twitter]} alt="" />
            </div>
            </div>
        </div>

    );
  };
  
  export default Perfil