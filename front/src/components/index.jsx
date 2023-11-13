import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Paquete from "./paquete";
import axios from 'axios';
import miImagen from "./images/banmer.jpg";
import './Styles/index.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
let idUser = -1, paso = false;;


function HeaderAndFooterExample() {

  const [listaPaquetes, setListaPaquetes] = useState([]);

  const mostrarPaquetes = () => {
    axios.get("http://localhost:3001/MostrarPaquetes", {
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
    }

    mostrarPaquetes();
    paso = true;
  }

  return (
<div>
    <div className='baner'>
        <h2 className='subt'>
          Welcome
        </h2>
    </div>

<div>
  <ul className="opciones">
    <li>Bodas</li>
    <li>Paquetes</li>
    <li>Ofertas</li>
    <li>Restaurantes</li>
  </ul>
</div>

    <div className='fondo'>

      {
        listaPaquetes.map((valor) => {
          return (
            <Paquete paquete={{id_Paquete: valor.idPaquete, Titulo: valor.Titulo_Paquete, 
              Descripcion:valor.Descripcion_Paquete, Precio:valor.Precio_Paquete }}/>
          )
        })
      }

    </div>

</div>
    
  );
}

export default HeaderAndFooterExample;