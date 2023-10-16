import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Styles/login.css';
import miImagen from "./images/login.png";
import axios from 'axios';

const Login = () => {

  const [email, setemail] = useState([]);
  const [pass, setpass] = useState([]);

  const buscarUsuario = () => {
    axios.post("http://localhost:3001/login", {
      correo: email,
      contra: pass

    }).then(()=>{
      alert("Informacion enviada");
    }

  )};


    return (
      <div className="container-login">

      <div className="center-container">

        <img src={miImagen} alt="Descripción de la imagen" className="imagen-izquierda"/>
        <form action="" className="form_main">
          <h1 className="heading">Login</h1>

          <h5 className="user-passw">Email</h5>
          <div className="inputContainer">
            <input type="text" className="inputField" id="username" value={email}
            onChange={(e) => {setemail(e.target.value)}}/>
          </div>
  
          <h5 className="user-passw">Password</h5>
          <div className="inputContainer">
            <input type="password" className="inputField" id="password" value={pass}
            onChange={(e) => {setpass(e.target.value)}}/>
          </div>
          <Link to="/" className="forgotLink">Forgot your password?</Link>
  
          
          <Link ><button className="button" onClick={buscarUsuario}>Submit</button></Link>
          <p className="dont-account">Don´t have an account yet? </p>
          <Link to="/register" className="RegisterLink">Create an account</Link>

        </form>
      </div>

      </div>
    );
  };
  
  export default Login;