import React from "react";
import './Styles/chat.css';
import ImgPerfil from "./images/login.png";

const Message = () => {
    return(
        <div className="message">
            <div className="messageInfo">
            <img
            className="imgMessage" 
             src={ImgPerfil}
             alt="" />
            <span>just now</span>
            </div>
        <div className="messageContent">
          <p className="contenidoM">hello</p>
          <img className="imgMessage2" src={ImgPerfil} alt="" />
        </div>

        </div>
        
    )
}

export default Message