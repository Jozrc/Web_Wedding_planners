import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Styles/historial.css';

let idUser = -1, paso = false;

const Historial = () =>{
  const cookies = new Cookies();
  const params = useParams();
  let idPaqueteVendido = params.idPaqueteVendido;
  let idPaqueteComprado = params.idPaqueteComprado;

  const [listaPaquetes, setListaPaquetes] = useState([]);

  const mostrarPaquetes = () => {
    axios.post("http://localhost:3001/MostrarHistorialPago", {
      idUser: idUser, idPaqueteComprado, idPaqueteComprado,
    }).then((response)=>{
        if(response.data[0].length > 0){
            setListaPaquetes(response.data[0]);
            console.log(response.data[0]);
        };
    })
  };

  if(!paso){
    //Verificar si existe un usuario logueado
    if(cookies.get('idUser') != null){
      idUser = cookies.get('idUser');
    }
    else{
      idUser = -1;
      window.location.href="/";
      return;
    }
    
    if(idPaqueteVendido!= null){
      idPaqueteComprado = idPaqueteVendido;
    }
    mostrarPaquetes();
    paso = true;
  }
    return(
<div className="historial">
<h1 class="tituloHistorial">Historial de pagos</h1>
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Paquete</th>
      <th>Estado</th>
      <th>Importe</th>
      <th>Fecha</th> 
      <th>Correo Cliente</th>
      <th>UserName Cliente</th>
      <th>{idPaqueteVendido!=null?'Ver Venta':'Ver Compra'}</th>
    </tr>
  </thead>
  <tbody>
      {
        listaPaquetes.map((valor) => {
          return (
            <tr>
                <td>{valor.IdPagoPaquete}</td>
                <td>{valor.Titulo_Paquete}</td>
                <td>{valor.Titulo_Paquete}</td>
                <td>${valor.PrecioPagado}</td>
                <td>{valor.FechaPago}</td>
                <td>{valor.Correo_Usuario}</td>
                <td>{valor.Username}</td>
                <td><Link to={(idPaqueteVendido!=null?"/verVenta/":"/verCompra/") + valor.idPaquete + "/" + valor.IdPaqueteComprado} type="button" className="btn btn-primary">{idPaqueteVendido!=null?'Ver Venta':'Ver Compra'}</Link></td>
            </tr>
          )
        })
      }
  </tbody>
</table>

</div>
    );
};

export default Historial