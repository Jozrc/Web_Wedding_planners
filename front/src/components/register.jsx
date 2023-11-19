import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Styles/login.css';
//import miImagen from "./images/login.png";
import miImagenR from "./images/register.png";
import axios from 'axios';




const Register = () => {

  const [nomUser, setnomUser] = useState([]);
  const [apePUser, setapePUser] = useState([]);
  const [apeMUser, setapeMUser] = useState([]);
  const [email, setemail] = useState([]);
  const [pass, setpass] = useState([]);
  const [username, setUsername] = useState([]);
  const [tel, setTel] = useState([]);
  const [fechaNac, setfechaNac] = useState([]);

  const [file, setFile] = useState('');


  const agregar = () => {
    axios.post("http://localhost:3001/create", {
      nombreUsuario: nomUser,
      apellidoPUsuario: apePUser,
      apellidoMUsuario: apeMUser,
      correo: email,
      contra: pass,
      username: username,
      telefonoUsuario: tel,
      fechaNacUsuario: fechaNac

    }).then((response)=>{
      let respuesta = response.data;

      if (respuesta.mensaje === ''){
        const formData = new FormData();
        formData.append('imagen', file);
        formData.append('idUsuario', respuesta.IdUsuarioRegistrado);

        axios.post("http://localhost:3001/editarImagenUser", formData)
        .then((response)=>{
          //console.log(response.data);
          alert("Usuario " + username + " Registrado");
          window.location.href="/";
        });
      }
      else{
        alert(respuesta.mensaje);
      }
    }

  )};


    return (
        <div className="container2">

        <div className="center-container">
  
          <img src={miImagenR} alt="Descripción de la imagen" className="imagen-izquierdaR"/>
  
          <form action="" className="form_main2">
            <h1 className="heading2">Register</h1>
  
            <div className="user-passw-container">
            <h5 className="user-passw">First Name</h5>
            <h5 className="user-passw">Last Name</h5>
            <h5 className="user-passw">Last Name</h5>
            </div>
            <div className="inputContainer">
              <input type="text" className="inputField2" value={nomUser}
            onChange={(e) => {setnomUser(e.target.value)}}/>

              <input type="text" className="inputField2" value={apePUser}
            onChange={(e) => {setapePUser(e.target.value)}}/>

            <input type="text" className="inputField2" value={apeMUser}
            onChange={(e) => {setapeMUser(e.target.value)}}/>
            </div>
    
            <h5 className="user-passw">Email</h5>
            <div className="inputContainer">
              <input type="gmail" className="inputField" value={email}
            onChange={(e) => {setemail(e.target.value)}}/>
            </div>

            <h5 className="user-passw">Password</h5>
            <div className="inputContainer">
              <input type="password" className="inputField" value={pass}
            onChange={(e) => {setpass(e.target.value)}}/>
            </div>

            <div className="user-passw-container">
              <h5 className="user-passw">Contact Number</h5>
              <h5 className="user-passw">Username</h5>
            </div>

            
            <div className="inputContainer">
              <input type="gmail" className="inputField4" value={tel}
            onChange={(e) => {setTel(e.target.value)}}/>
            <input type="text" className="inputField4" value={username}
            onChange={(e) => {setUsername(e.target.value)}}/>
            </div>
    
            <div className="user-passw-container">
            <h5 className="user-passw">Date</h5>
            <h5 className="user-passw">Country</h5>
            </div>
            <div className="inputContainer">
              <input type="date" className="inputField3" value={fechaNac}
            onChange={(e) => {setfechaNac(e.target.value)}}/>
              <input type="text" className="inputField3" />
            </div>

            <h5 className="user-passw">Selecciona tu imagen de perfil:</h5>
            <div className="inputContainer">
              <input type="file" className="passw" accept="image/*" name="foto" id="foto"
               onChange={(e) => {setFile(e.target.files[0])}}/>
            </div>

            
            <Link ><button className="button" onClick={agregar}>Submit</button></Link>
            <p className="dont-account">Do you already have an account? </p>
            <Link to="/login" className="RegisterLink">Log in</Link>
  
          </form>
        </div>
  
        </div>

    );
  };
  
  export default Register;