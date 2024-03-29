import React, { useState } from "react";
import Message from "./message";
import axios from 'axios';
import './Styles/chat.css';

let paso = false;


const Messages = ({user}) => {
    const [listaMensajes, setListaMensajes] = useState([]);

    const mostrarMensajes = () => {
        axios.post("http://localhost:3001/MostrarMensajes", {
            idUsuarioE: user.idUserE,
            idUsuarioR: user.idUserR,
        }).then((response)=>{
            if(response.data[0].length > 0){
                setListaMensajes(response.data[0]);
            };
        })
    };

    if(!paso){
        if(user.idUserE!=0){
            mostrarMensajes();
            //paso = true;
        }
    }

    return(
        
        <>
        {
            
        }
        
        <div className="messages">
            {
                listaMensajes.map((valor) => {
                    return (
                        <Message mensaje={{Emisor: valor.Emisor, UserNameE:valor.Username_Emisor, 
                            Receptor:valor.Receptor, UserNameR: valor.Username_Receptor, 
                            Mensaje:valor.Mensaje, FechaEnvio:valor.Fecha_envio, 
                            imagen:(`data:image/png;base64,${valor.Foto_Perfil}`)}}/>
                    )
                })
            }
        </div>
        </>
    )
}

export default Messages