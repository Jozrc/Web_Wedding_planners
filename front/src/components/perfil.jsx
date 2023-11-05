import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Styles/perfil.css';
import imgPerfil from "./images/perfil.jpg";
import msgPerfil from "./images/msgPerfil.png";
import facebook from "./images/facebook.png";
import instagram from "./images/instagram.png";
import twitter from "./images/twitter.png";
import axios from 'axios';

import Cookies from 'universal-cookie';
const cookies = new Cookies;
let idUser = -1;


const Perfil = () => {
    const [nomUser, setnomUser] = useState();
    const [apeUser, setapeUser] = useState();
    const [email, setemail] = useState();
    const [pass, setpass] = useState();
    const [username, setUsername] = useState();
    const [tel, setTel] = useState();
    const [fechaNac, setfechaNac] = useState();

    const buscarUsuario = () => {
        axios.post("http://localhost:3001/profile", {
          idUser: idUser,
        }).then((response)=>{
            if(response.data.length > 0){
                var respuesta = response.data[0];

                setnomUser(respuesta.Nombre_Usuario);
                setapeUser(respuesta.Apellido_Paterno_Usuario + " " + respuesta.Apellido_Materno_Usuario);
                setemail(respuesta.Correo_Usuario);
                setpass(respuesta.Contrasenia_Usuario);
                setUsername(respuesta.Username);
                setTel(respuesta.Telefono_Usuario);
                setfechaNac(respuesta.Fecha_Nacimiento);
            };
        })
    };

    const eliminarUsuario = () => {
        axios.post("http://localhost:3001/deleteUser", {
          idUser: idUser,
        }).then((response)=>{
            alert(response.data);
            cookies.remove('idUser', {path: "/"});
            window.location.href="./";
        })
    };

    if(cookies.get('idUser') == null){
        window.location.href="./";
        return;
    }
    else{
        idUser = cookies.get('idUser');
        buscarUsuario();
    }

    
    return (
        

        <div className="Perfil">
            <img className="imgPerfil" src={[imgPerfil]} alt="" />
            <h1 className="NombrePerfil"> {nomUser + " " + apeUser + " (" + username + ")"}</h1>
            <h4 className="NombrePerfil"> {"Correo: " + email + " con Password: " + pass}</h4>
            <h5 className="NombrePerfil"> {"Telefono: " + tel + " con Fecha de Nacimiento: " + fechaNac}</h5>
            <div className="RedesCaja">
            <Link to="/chat" ><button className="buttonMsg">
            <span>Enviar Mensaje</span>
            <img src={[msgPerfil]} alt="Imagen" />
            </button> </Link>

            <Link to="/editUser" ><button className="buttonMsg">
            <span>Modificar</span>
            </button> </Link>

            <button className="buttonMsg" onClick={eliminarUsuario}>
            <span>Eliminar</span>
            </button>

            </div>
            
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