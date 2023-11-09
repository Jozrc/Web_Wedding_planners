import React from "react";
import './Styles/carrito.css';
import imgCarrito from "./images/anillos2.jpg"

const Carrito = () => {
    return (
<div className="reservacion">
<div className="contenido">
  <img className="ImgReservacion" src={[imgCarrito]} alt="Imagen de la Reservación" />
  <div className="datos">
    <h2 className="tituloCarrito">Datos de la Reservación</h2>
    <p className="subtituloCarrito"><strong>Evento:</strong> Nombre del Evento</p>
    <p className="txtCarrito"><strong>Fecha:</strong> <input className="inputCarrito" type="date" placeholder="Selecciona la fecha" /></p>
    <p className="txtCarrito"><strong>Hora:</strong> <input className="inputCarrito" type="time" placeholder="Selecciona la hora" /></p>
    <p className="txtCarrito"><strong>Nombre del Cliente:</strong> <input className="inputCarrito" type="text" placeholder="Nombre del Cliente" /></p>
    <p className="txtCarrito"><strong>Correo Electrónico:</strong> <input className="inputCarrito" type="email" placeholder="correo@ejemplo.com" /></p>
    <p className="txtCarrito"><strong>Teléfono:</strong> <input className="inputCarrito" type="tel"  placeholder="(123) 456-7890" /></p>
    <p className="txtCarrito"><strong>Número de Personas:</strong> <input className="inputCarrito" type="number" placeholder="Número de Personas" /></p>
    <p className="txtCarrito"><strong>Comentarios:</strong></p>
    <textarea className="inputCarrito" id="comentarios" placeholder="Cualquier comentario adicional sobre la reserva."></textarea>
  </div>
</div>
<button className="buttonCarrito">Confirmar</button>
</div>


    );
};
export default Carrito