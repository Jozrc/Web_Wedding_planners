import React, { useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './Styles/carrito.css';
import imgCarrito from "./images/anillos2.jpg"

let idUser = -1;


const Carrito = () => {
  const params = useParams();
  const cookies = new Cookies();

  const [TituloPaq, setTituloPaq] = useState('');
  const [PrecioPaq, setPrecioPaq] = useState('');

  const [FechaEvento, setFechaEvento] = useState('');
  const [HoraEvento, setHoraEvento] = useState('');
  const [NombreCliente, setNombreCliente] = useState('');
  const [CorreoCliente, setCorreoCliente] = useState('');
  const [TelefonoCliente, setTelefonoCliente] = useState('');
  const [NumPersonas, setNumPersonas] = useState('');
  const [Comentarios, setComentarios] = useState('');

  let idPaquete = params.idPaquete;

  const mostrarPaquete = () => {
    axios.post("http://localhost:3001/MostrarPaqueteByID", {
        idPaquete: idPaquete,
    }).then((response)=>{
        if(response.data[0].length > 0){
            let resultado = response.data[0];
            resultado = resultado[0];

            setTituloPaq(resultado.Titulo_Paquete);
            setPrecioPaq(resultado.Precio_Paquete);
        };
    })
  };

  if(cookies.get('idUser') == null){
    window.location.href="/";
    return;
  }
  else{
      idUser = cookies.get('idUser');
      console.log(cookies.get('idUser'));
      mostrarPaquete();
  }

  const registrarCompraPaquete = () => {
    axios.post("http://localhost:3001/regCompraPaquete", {
      idPaquete: idPaquete,
      idCliente: idUser,
      FechaEvento: FechaEvento,
      HoraEvento: HoraEvento,
      NombreCliente: NombreCliente,
      CorreoCliente: CorreoCliente,
      TelefonoCliente: TelefonoCliente,
      NumPersonas: NumPersonas,
      Comentarios:Comentarios,
      PrecioPagado: PrecioPaq
    }).then((response)=>{
      alert("Paquete Reservado con exito");
      window.location.href="/compra";
    }
  )};

    return (
<div className="reservacion">
<div className="contenido">
  <img className="ImgReservacion" src={[imgCarrito]} alt="Imagen de la Reservación" />
  <div className="datos">
    <h2 className="tituloCarrito">Datos de la Reservación</h2>
    <p className="subtituloCarrito"><strong>Evento:</strong> {TituloPaq}</p>
    <p className="subtituloCarrito"><strong>Precio: $</strong> {PrecioPaq}</p>

    <p className="txtCarrito"><strong>Fecha:</strong> 
        <input className="inputCarrito" type="date" placeholder="Selecciona la fecha" 
        value={FechaEvento} onChange={(e) => {setFechaEvento(e.target.value)}}/></p>

    <p className="txtCarrito"><strong>Hora:</strong> 
        <input className="inputCarrito" type="time" placeholder="Selecciona la hora" 
        value={HoraEvento} onChange={(e) => {setHoraEvento(e.target.value)}}/></p>

    <p className="txtCarrito"><strong>Nombre del Cliente:</strong> 
        <input className="inputCarrito" type="text" placeholder="Nombre del Cliente" 
        value={NombreCliente} onChange={(e) => {setNombreCliente(e.target.value)}}/></p>

    <p className="txtCarrito"><strong>Correo Electrónico:</strong> 
        <input className="inputCarrito" type="email" placeholder="correo@ejemplo.com" 
        value={CorreoCliente} onChange={(e) => {setCorreoCliente(e.target.value)}}/></p>

    <p className="txtCarrito"><strong>Teléfono:</strong> 
        <input className="inputCarrito" type="tel"  placeholder="(123) 456-7890" 
        value={TelefonoCliente} onChange={(e) => {setTelefonoCliente(e.target.value)}}/></p>

    <p className="txtCarrito"><strong>Número de Personas:</strong> 
        <input className="inputCarrito" type="number" placeholder="Número de Personas" 
        value={NumPersonas} onChange={(e) => {setNumPersonas(e.target.value)}}/></p>

    <p className="txtCarrito"><strong>Comentarios:</strong></p>
        <textarea className="inputCarrito" id="comentarios" placeholder="Cualquier comentario adicional sobre la reserva."
        value={Comentarios} onChange={(e) => {setComentarios(e.target.value)}}></textarea>

  </div>
</div>
<button className="buttonCarrito" onClick={registrarCompraPaquete}>Confirmar</button>
</div>


    );
};
export default Carrito