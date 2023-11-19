import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Paquete from "./paquete";
import axios from 'axios';
import miImagen from "./images/banmer.jpg";
import './Styles/index.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
let idUser = -1, paso = false, Categoria = 0;


function HeaderAndFooterExample() {

  const [listaPaquetes, setListaPaquetes] = useState([]);
  //const [Categoria, setCategoria] = useState(3);

  function changeCategoria(categoria) {
    //setCategoria(categoria);
    Categoria = categoria
    //mostrarPaquetes();
    mostrarPaquetes();
  };

  const mostrarPaquetes = () => {
    axios.post("http://localhost:3001/MostrarPaquetes", {
      Categoria: Categoria
    }).then((response)=>{
        if(response.data[0].length > 0){
            setListaPaquetes(response.data[0]);
        }
        else{
          setListaPaquetes([]);
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
    <li onClick={(e)=>changeCategoria(3)}>Ofertas</li>
    <li onClick={(e)=>changeCategoria(2)}>AudioVisual</li>
    <li onClick={(e)=>changeCategoria(1)}>Salones</li>
    <li onClick={(e)=>changeCategoria(0)}>Paquetes</li>
  </ul>
</div>

    <div className='fondo'>

      {
        listaPaquetes.map((valor) => {
          return (
            <Paquete paquete={{id_Paquete: valor.idPaquete, Titulo: valor.Titulo_Paquete, 
              Descripcion:valor.Descripcion_Paquete, Precio:valor.Precio_Paquete, Imagen:(`data:image/png;base64,${valor.ImagenPaquete}`),
              venta: false }}/>
          )
        })
      }

    </div>

</div>
    
  );
}

export default HeaderAndFooterExample;