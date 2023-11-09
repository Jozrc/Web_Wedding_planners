import React, { useState } from "react";
import Img from "./images/img.png";
import Attach from "./images/attach.png";
import axios from 'axios';
import './Styles/chat.css';

const Input = ({user}) => {
    const [mensaje, setMensaje] = useState();

    const enviarMensaje = () => {
        axios.post("http://localhost:3001/sendMessage", {
            idUsuarioE: user.idUserE,
            idUsuarioR: user.idUserR,
            mensaje: mensaje
        }).then(()=>{
            setMensaje("");
            alert("Mensaje Enviado");
        })
    };
    
    return (
        <div className="input">
            <input className="input1" type="text"
             placeholder="Type something..." value={mensaje}
             onChange={(e) => {setMensaje(e.target.value)}}
            />
            <div className="send">
            <img className="imgInput" src={Attach} alt="" />
            <input className="input1" type="file" style={{dislplay:"none"}} id="file" />
            <label htmlFor="file">
                <img className="imgInput" src={Img} alt="" />
            </label>
            <button className="buttonInput" onClick={enviarMensaje}>Send</button>
            </div>
        </div>
    )
}

export default Input