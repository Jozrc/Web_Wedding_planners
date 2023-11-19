import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useParams } from 'react-router-dom';
import './Styles/planner.css';
import boda from "./images/boda.jpeg"
import anillo from "./images/anillos.png"

let paso = false, idUser = -1;

const Planner = () => {
    const params = useParams();
    const cookies = new Cookies();

    let idPaquete = params.idPaquete;

    const [TituloPaq, setTituloPaq] = useState('');
    const [DescripcionPaq, setDescripcionPaq] = useState('');
    const [PrecioPaq, setPrecioPaq] = useState('');
    const [EstadoPaq, setEstadoPaq] = useState('');
    const [idCreadorPaq, setidCreadorPaq] = useState('');
    const [UserNameCreadorPaq, setUserNameCreadorPaq] = useState('');
    const [CapacidadPaq, setCapacidadPaq] = useState('');
    const [listaServicios, setListaServicios] = useState([]);

    const [imagen, setImagen] = useState();

    const mostrarPaquete = () => {
        axios.post("http://localhost:3001/MostrarPaqueteByID", {
            idPaquete: idPaquete,
        }).then((response)=>{
            if(response.data[0].length > 0){
                let resultado = response.data[0];
                resultado = resultado[0];

                setTituloPaq(resultado.Titulo_Paquete);
                setDescripcionPaq(resultado.Descripcion_Paquete);
                setCapacidadPaq(resultado.Capacidad);
                setPrecioPaq(resultado.Precio_Paquete);
                setidCreadorPaq(resultado.Creador_Paquete);
                setUserNameCreadorPaq(resultado.Username);
                setEstadoPaq(resultado.EstadoPaquete);
                setImagen(`data:image/png;base64,${resultado.ImagenPaquete}`);
                
            };
        })

        axios.post("http://localhost:3001/MostrarServiciosByPaqueteID", {
            idPaquete: idPaquete,
        }).then((response)=>{
            if(response.data[0].length > 0){
                let resultado = response.data[0];
                //resultado = resultado[0];

                setListaServicios(resultado);
            };
        })
    };

    const eliminarPaquete = () => {
        axios.post("http://localhost:3001/deletePaquete", {
            idPaquete: idPaquete,
        }).then((response)=>{
            var respuesta = response.data;
            alert(respuesta.Mensaje);

            //cookies.remove('idUser', {path: "/"});
            window.location.href="/misPaquetes";
        })
    };

    if(!paso){
        mostrarPaquete();
        if(cookies.get('idUser') != null){
            idUser = cookies.get('idUser');
        }

        paso = true;
    }

    window.beforeunload  = function() {
        paso = false;
        //return '¿Desea recargar la página web?';
    };

    

    return (
    
<section class="container-plannerperfil">

    <div className="box">
<div className="containerTitulo">
    <h1 className="titulo">{TituloPaq}</h1> 
    <img className="bodaIcon" src={[anillo]} alt="" />
</div>

    <img className="imgBoda" src={imagen} alt="" />

    <div className="descricion-box">

    <h2 className="titulo">Informacion del paquete</h2>

   <div className="informacion">

    <h3 className="infoSubTitulo">Descripción</h3>
    <p>{DescripcionPaq}</p>

    <h3 className="infoSubTitulo">Servicios que ofrece</h3>

    <ul>
        {
            listaServicios.map((valor) => {
                return (
                    <li>{valor.Nombre_categoria}</li>
                )
            })
        }
    </ul>

    <h3 className="infoSubTitulo">Capacidad</h3>
    <p>{CapacidadPaq + " Personas"}</p>

    <h3 className="infoSubTitulo">Forma de pago</h3>
    <p>Mensual</p>

    <h3 className="infoSubTitulo">Precio del Paquete</h3>
    <p>{PrecioPaq}</p>

   </div>
   

   </div>

<div className="descricion-box">

<ul className="opciones-planner">
        {
            idCreadorPaq==idUser?
                <>
                    <Link to={"/editPaquete/" + idPaquete}><li>Editar</li></Link>
                    <Link onClick={eliminarPaquete}><li> {EstadoPaq==0? 'Habilitar' : 'Deshabilitar' } </li></Link>
                </>
            :
                <>
                    <Link to={"/profile/" + idCreadorPaq + "/" + UserNameCreadorPaq}><li>Contacto</li></Link>
                    <Link to={"/carrito/" + idPaquete}><li>Reservacion</li></Link>
                </>
        }
    
    <li>Ayuda</li>
  </ul>

</div>

    </div>

</section>

    );
  };
  
  export default Planner