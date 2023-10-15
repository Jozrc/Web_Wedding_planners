import React from "react";
import { Link } from 'react-router-dom';
import './Styles/chat.css';
import Cam from "./images/cam.png";
import Add from "./images/add.png";
import More from "./images/more.png";
import ImgPerfil from "./images/login.png";
import Messages from "./messages";
import Input from "./input";

const Chat = () => {
    return (

    <div className="home">

        <div className="containerChatP">

            <div className="sidebar">

            <div className="navbarChat">

            <span className="logoChat">Lama Chat</span>
            <div className="user">
                <img className="perfilimg" src={ImgPerfil} alt="" />
                <span>John</span>
            </div>
            </div>

            <div className="searchChat">
                <div className="searchForm">
                    <input className="busquedadChat" type="text" placeholder="Search user" />
                </div>
                <div className="userChat">
                    <img className="imgPerfil" src={ImgPerfil} alt="" />
                    <div className="userChatInfo">
                        <span>Jane</span>
                    </div>
                </div>

            </div>

            <div className="chats">
                <div className="userChat">
                 <img className="imgPerfil" src={ImgPerfil} alt="" />
                 <div className="userChatInfo">
                        <span>Jane</span>
                        <p>Hola</p>
                 </div>
                </div>

            </div>

            <div className="chats">
                <div className="userChat">
                 <img className="imgPerfil" src={ImgPerfil} alt="" />
                 <div className="userChatInfo">
                        <span>Jane</span>
                        <p>Hola</p>
                 </div>
                </div>

            </div>

            </div>

            <div className="chat">

            <div className="chatInfo">

            <span>Nombre</span>
            
            <div className="chatIcons">
            <img className="imgIcon" src={Cam} alt="" />
            <img className="imgIcon"  src={Add} alt="" />
            <img className="imgIcon"  src={More} alt="" />
            </div>
            </div>
                <Messages/>
                <Input/>
            </div>
        </div>
    </div>
    );
  };
  
  export default Chat