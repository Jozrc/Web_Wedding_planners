import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import ImgPerfil from "./images/login.png";
import './Styles/chat.css';

//PONER LINEA BASE REACT .  rfce

function Chats({usuario, sendDatos}){
    var ruta = "/profile/" + usuario.idUser+"/"+usuario.userName;

    const enviarDatos = () =>{
        sendDatos(usuario);
    };

    return (
        <div className="chats">
            <div className="userChat">
                <img className="imgPerfil" src={usuario.imagen} alt="" />
                <div className="userChatInfo">
                    <span>{usuario.userName}</span>
                    <p>{usuario.lastMessage}</p>
                    <p>{usuario.lastFecha}</p>
                    <Link to={ruta} type="button" className="btn btn-primary">Ver Perfil</Link>
                    <button type="button" className='btn btn-warning' onClick={enviarDatos}>Ver Chat</button>
                </div>
            </div>
        </div>

        
    )
}


export default Chats;