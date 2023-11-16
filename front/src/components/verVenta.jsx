import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Styles/planner.css';
import boda from "./images/boda.jpeg"
import anillo from "./images/anillos.png"

let paso = false;

const VerVenta = () => {
    const params = useParams();

    let idPaqueteVendido = params.idPaqueteVendido;
    let idPaqueteComprado = params.idPaqueteComprado;
    let idPaquete = params.idPaquete;

    const [TituloPaq, setTituloPaq] = useState('');
    const [DescripcionPaq, setDescripcionPaq] = useState('');
    const [PrecioPaq, setPrecioPaq] = useState('');
    const [PrecioPagado, setPrecioPagado] = useState('');
    const [Pagado, setPagado] = useState('');
    const [idCliente, setidCliente] = useState('');
    const [UserNameCliente, setUserNameCliente] = useState('');
    const [CapacidadPaq, setCapacidadPaq] = useState('');
    const [CapacidadCliente, setCapacidadCliente] = useState('');
    const [FechaHoraEvento, setFechaEvento] = useState('');
    const [listaServicios, setListaServicios] = useState([]);

    const mostrarPaquete = () => {
        axios.post("http://localhost:3001/MostrarPaquetesVendidosByID", {
            idPaquete: idPaqueteVendido,
        }).then((response)=>{
            if(response.data[0].length > 0){
                let resultado = response.data[0];
                resultado = resultado[0];

                setTituloPaq(resultado.Titulo_Paquete);
                setDescripcionPaq(resultado.Comentarios);
                setCapacidadPaq(resultado.Capacidad);
                setCapacidadCliente(resultado.Invitados);
                setPrecioPaq(resultado.PrecioPaquete);
                setPrecioPagado(resultado.PrecioPagado);
                setPagado(resultado.Pagado);
                setidCliente(resultado.idUserCliente);
                setUserNameCliente(resultado.UsernameCliente);
                setFechaEvento(resultado.FechaEvento + " " + resultado.HoraEvento);
                
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

    const pagarPaquete = () => {
        var precioPagar = prompt('Cuanta cantidad desea abonar?', '100.00');

        axios.post("http://localhost:3001/regPagoPaq", {
            idPaqueteComprado: idPaqueteComprado,
            PrecioPagado: precioPagar,
        }).then((response)=>{
            let resultado = response.data;
            alert(resultado.mensaje);
        })

        paso = false;
    };

    if(!paso){
        if(idPaqueteComprado!= null){
            idPaqueteVendido = idPaqueteComprado;
        }
        mostrarPaquete();
        paso = true;
    }

    return (
    
<section class="container-plannerperfil">

    <div className="box">
<div className="containerTitulo">
    <h1 className="titulo">{TituloPaq}</h1> 
    <img className="bodaIcon" src={[anillo]} alt="" />
</div>

    <img className="imgBoda" src={[boda]} alt="" />

    <div className="descricion-box">

    <h2 className="titulo">Informacion de la compra del paquete</h2>

   <div className="informacion">

    <h3 className="infoSubTitulo">Comentarios especiales del cliente</h3>
    <p>{DescripcionPaq}</p>

    <h3 className="infoSubTitulo">Servicios que se ofrecen</h3>

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

    <h3 className="infoSubTitulo">Invitados del Cliente</h3>
    <p>{CapacidadCliente + " Invitados"}</p>

    <h3 className="infoSubTitulo">Forma de pago</h3>
    <p>Mensual</p>

    <h3 className="infoSubTitulo">Precio del Paquete</h3>
    <p>$ {PrecioPaq}</p>

    <h3 className="infoSubTitulo">Precio Pagado</h3>
    <p>$ {PrecioPagado}</p>

    <h3 className="infoSubTitulo">Monto Restante</h3>
    <p>$ {PrecioPaq - PrecioPagado}</p>

    <h3 className="infoSubTitulo">Fecha y Hora del Evento</h3>
    <p>{FechaHoraEvento}</p>

   </div>
   

   </div>

<div className="descricion-box">

<ul className="opciones-planner">
    <Link to={"/profile/" + idCliente + "/" + UserNameCliente}><li>Contacto</li></Link>
        {idPaqueteComprado!= null && Pagado!=1? <><Link onClick={pagarPaquete}><li>Pagar Paquete</li></Link></>:<></>}
    <Link to={"/historial/" + (idPaqueteComprado!= null?idPaqueteComprado:idPaqueteVendido)}><li>Historial de Pagos</li></Link>
    <li>Ayuda</li>
  </ul>

</div>

    </div>

</section>

    );
  };
  
  export default VerVenta