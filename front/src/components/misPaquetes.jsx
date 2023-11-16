import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import Paquete from "./paquete";
import './Styles/index.css';
import imgCompra from "./images/banmer.jpg"

let idUser = -1, paso = false;

const MisPaquetes = () =>{
  const cookies = new Cookies();

  const [listaPaquetes, setListaPaquetes] = useState([]);

  const mostrarPaquetes = () => {
    axios.post("http://localhost:3001/MostrarMisPaquetes", {
      idUser: idUser,
    }).then((response)=>{
        if(response.data[0].length > 0){
            setListaPaquetes(response.data[0]);
        };
    })
  };

  if(!paso){
    //Verificar si existe un usuario logueado
    if(cookies.get('idUser') != null){
      idUser = cookies.get('idUser');
      console.log("idUsuario: " + idUser);
    }
    else{
      idUser = -1;
      window.location.href="/";
      return;
    }

    mostrarPaquetes();
    paso = true;
  }


    return(
      <div>
        <div className='baner'>
          <h2 className='subt'>
            Mis Paquetes
          </h2>
        </div>

        <div className="fondo">
          {
            listaPaquetes.map((valor) => {
              return (
                <Paquete paquete={{id_Paquete: valor.idPaquete, Titulo: valor.Titulo_Paquete, 
                  Descripcion:valor.Descripcion_Paquete, Precio:valor.Precio_Paquete,
                  venta: false }}/>
              )
            })
          }
        </div>
      </div>
    );
};

export default MisPaquetes