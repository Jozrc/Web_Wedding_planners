import React from "react";
import './Styles/chat.css';
import ImgPerfil from "./images/login.png";

const Message = ({mensaje}) => {
    return(
        <div className="message">
            <div className="messageInfo">
                <img
                className="imgMessage" 
                src={mensaje.imagen}
                alt="" />
                <span>{mensaje.UserNameE}</span>
                <span>{mensaje.FechaEnvio}</span>
            </div>

            <div className="messageContent">
                <p className="contenidoM">{mensaje.Mensaje}</p>
                
            </div>
        </div>
    )
}

export default Message