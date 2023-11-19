import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Styles/login.css';
//import miImagen from "./images/login.png";
import miImagenR from "./images/register.png";
import axios from 'axios';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
let idUser = -1, cuenta = 0;



const EditUser = () => {
  const [nomUser, setnomUser] = useState();
  const [apePUser, setapePUser] = useState([]);
  const [apeMUser, setapeMUser] = useState([]);
  const [email, setemail] = useState();
  const [pass, setpass] = useState();
  const [username, setUsername] = useState([]);
  const [tel, setTel] = useState();
  const [fechaNac, setfechaNac] = useState();

  const [file, setFile] = useState('');

  const buscarUsuario = () => {
    axios.post("http://localhost:3001/profile", {
      idUser: idUser,
    }).then((response)=>{
        if(response.data.length > 0){
            var respuesta = response.data[0];

            setnomUser(respuesta.Nombre_Usuario);
            setapePUser(respuesta.Apellido_Paterno_Usuario);
            setapeMUser(respuesta.Apellido_Materno_Usuario);
            setemail(respuesta.Correo_Usuario);
            setpass(respuesta.Contrasenia_Usuario);
            setUsername(respuesta.Username);
            setTel(respuesta.Telefono_Usuario);
            setfechaNac(respuesta.Fecha_Nacimiento);
        };
    })
  };

  if(cookies.get('idUser') == null){
    window.location.href="/";
    return;
  }
  else{
    idUser = cookies.get('idUser');
    
    if(cuenta !==1){
      buscarUsuario();
      cuenta = 1;
    }
  }

  const editar = () => {
    //const reader = new FileReader();
    //console.log(file);
    //const imageData = reader.result.split(',')[1]; // Obtén los datos base64 sin la cabecera

    axios.post("http://localhost:3001/editarUser", {
      idUsuario: idUser,
      nombreUsuario: nomUser,
      apellidoPUsuario: apePUser,
      apellidoMUsuario: apeMUser,
      correo: email,
      contra: pass,
      username: username,
      telefonoUsuario: tel,
      fechaNacUsuario: fechaNac

    }).then(()=>{
       //alert("Informacion enviada");
      const formData = new FormData();
      formData.append('imagen', file);
      formData.append('idUsuario', idUser);

      axios.post("http://localhost:3001/editarImagenUser", formData)
      .then(()=>{
        alert("Informacion enviada");
      });
    });
  };


    return (
        <div className="container2">

        <div className="center-container">
  
          <img src={miImagenR} alt="Descripción de la imagen" className="imagen-izquierdaR"/>
  
          <form action="" className="form_main2">
            <h1 className="heading2">Edit User</h1>
  
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

            <Link to="/perfil"><button className="button" onClick={editar}>Submit</button></Link>
            <Link to="/perfil"><button className="button" >Cancel</button></Link>
  
          </form>
        </div>
  
        </div>

    );
  };
  
  export default EditUser;