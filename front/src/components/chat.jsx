import React, { useState } from "react";
import './Styles/chat.css';
import Cam from "./images/cam.png";
import Add from "./images/add.png";
import More from "./images/more.png";
import ImgPerfil from "./images/login.png";
import Messages from "./messages";
import Input from "./input";
import axios from 'axios';
import Chats from "./chats";
import { useParams } from 'react-router-dom';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
let idUser = -1, paso = 0;

const Chat = () => {
    const params = useParams();
    var idUserContacto = params.idUserContacto;

    const [nomUser, setnomUser] = useState();
    const [apeUser, setapeUser] = useState();
    const [username, setUsername] = useState('');
    const [imagen, setImagen] = useState();

    const [listaChats, setListaChats] = useState([]);
    const [chatSelect, setChatSelect] = useState([]);
    const [usernamechatSelect, setUserNameChatSelect] = useState([]);

    const buscarUsuario = () => {
        axios.post("http://localhost:3001/profile", {
          idUser: idUser,
        }).then((response)=>{
            if(response.data.length > 0){
                var respuesta = response.data[0];
                setnomUser(respuesta.Nombre_Usuario);
                setapeUser(respuesta.Apellido_Paterno_Usuario + " " + respuesta.Apellido_Materno_Usuario);
                setUsername(respuesta.Username);
                setImagen(`data:image/png;base64,${respuesta.Foto_Perfil}`);
            };
        })
    };

    const buscarChats = () => {
        axios.post("http://localhost:3001/MostrarChats", {
            idUsuarioR: idUser,
        }).then((response)=>{
            if(response.data[0].length > 0){
                setListaChats(response.data[0]);
            };
        })
    };

    const sendDatos= (datos) =>{
        setChatSelect(datos.idUser);
        setUserNameChatSelect(datos.userName);
    };

    const sendDatosA= () =>{
        setChatSelect(idUser);
        setUserNameChatSelect(username);
    };

    if(cookies.get('idUser') == null){
        window.location.href="/";
        return;
    }
    else{
        idUser = cookies.get('idUser');
        if(paso === 0){
            buscarUsuario();

            if(idUserContacto != null){
                sendDatos({idUser:idUserContacto, userName:username});
            }
            else{
                sendDatos({idUser:idUser, userName:username});
                //sendDatosA();
            }
            
            paso = 1;

            
            buscarChats();
        }
        
    }

    return (

    <div className="home">

        <div className="containerChatP">

            <div className="sidebar">

                <div className="navbarChat">
                    <span className="logoChat">Lama Chat</span>
                    <div className="user">
                        <img className="perfilimg" src={imagen} alt="" />
                        <span>{username}</span>
                    </div>
                </div>

                <div className="searchChat">
                    <div className="searchForm">
                        <input className="busquedadChat" type="text" placeholder="Search user" />
                    </div>
                    <div className="userChat">
                        <img className="imgPerfil" src={imagen} alt="" />
                        <div className="userChatInfo">
                            <span>{nomUser + " " + apeUser}</span>
                        </div>
                        <button type="button" className='btn btn-warning' onClick={sendDatosA}>Ver Chat</button>
                    </div>
                </div>

                <div className="messageList">
                    {
                        listaChats.map((valor) => {
                            return (
                                <Chats usuario={{idUser: valor.idUser, userName: valor.Username, 
                                    lastMessage: valor.UltimoMensaje, lastFecha:valor.Fecha_envio, 
                                    imagen:(`data:image/png;base64,${valor.Foto_Perfil}`)}} sendDatos={sendDatos}/>
                            )
                        })
                        
                    }
                </div>
            </div>

            <div className="chat">

                <div className="chatInfo">
                    <span>{usernamechatSelect}</span>
                    
                    <div className="chatIcons">
                        <img className="imgIcon" src={Cam} alt="" />
                        <img className="imgIcon"  src={Add} alt="" />
                        <img className="imgIcon"  src={More} alt="" />
                    </div>
                </div>
                <Messages user={{idUserR: idUser, idUserE: chatSelect}}/>
                <Input user={{idUserR: chatSelect, idUserE: idUser}}/>
            </div>
        </div>
    </div>
    );
  };
  
  export default Chat