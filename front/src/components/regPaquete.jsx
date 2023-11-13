import React, { useState } from "react";
import Select from 'react-select';
import axios from 'axios';
import './Styles/carrito.css';
import imgCarrito from "./images/anillos2.jpg"

import Cookies from 'universal-cookie';
const cookies = new Cookies();
let idUser = -1;

const RegPaquete = () => {
  const [CategoriaSelectedOptions, setCategoriaSelectedOptions] = useState([]);
  const [ServicioSelectedOptions, setServicoSelectedOptions] = useState([]);

  const [TituloPaq, setTituloPaq] = useState('');
  const [DescripcionPaq, setDescripcionPaq] = useState('');
  const [PrecioPaq, setPrecioPaq] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [NumPerso, setNumPerso] = useState('');

  if(cookies.get('idUser') == null){
    window.location.href="./";
    return;
  }
  else{
      idUser = cookies.get('idUser');
  }

  const handleSelectCategoriaChange = (selected) => {
    setCategoriaSelectedOptions(selected);
    console.log(CategoriaSelectedOptions);
  };

  const handleSelectServicioChange = (selected) => {
    setServicoSelectedOptions(selected);
    console.log(ServicioSelectedOptions);
  };

  const optionsCategoria = [
    { value: 1, label: 'Opción 1' },
    { value: 2, label: 'Opción 2' }
  ];

  const optionsServicio = [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' }
  ];

  const registrarPaquete = () => {
    axios.post("http://localhost:3001/regPaquetes", {
      TituloPaq: TituloPaq,
      DescripcionPaq: DescripcionPaq,
      PrecioPaq: PrecioPaq,
      CreadorPaq: idUser,
      Correo: Correo,
      Telefono: Telefono,
      NumPerso: NumPerso,
      CategoriaPaq:CategoriaSelectedOptions,
      ServicioPaq:ServicioSelectedOptions
    }).then((response)=>{
      alert("Paquete Registrado");
      window.location.href="./";
    }

  )};

    return (
<div className="reservacion">
<div className="contenido">
  <img className="ImgReservacion" src={[imgCarrito]} alt="Imagen de la Reservación" />
  <div className="datos">
    <h2 className="tituloCarrito">Datos del Paquete</h2>
    <p className="subtituloCarrito"><strong>Evento:</strong> Nombre del Evento</p>

    <p className="txtCarrito"><strong>Nombre del Paquete:</strong> 
        <input className="inputCarrito" type="text" placeholder="Nombre del Paquete" 
        value={TituloPaq} onChange={(e) => {setTituloPaq(e.target.value)}}/></p>

    <p className="txtCarrito"><strong>Descripción:</strong> </p>
        <textarea className="inputCarrito" id="comentarios" placeholder="Cualquier comentario adicional sobre el paquete."
        value={DescripcionPaq} onChange={(e) => {setDescripcionPaq(e.target.value)}}></textarea>

    <p className="txtCarrito"><strong>Servicios que incluye el paquete:</strong> </p>
      <Select isMulti options={optionsServicio} placeholder="Selecciona un servicio" onChange={handleSelectServicioChange} className="categorie" />

    <p className="txtCarrito"><strong>Categoria a la que corresponde:</strong> </p>
      <Select isMulti options={optionsCategoria} placeholder="Selecciona una categoría" onChange={handleSelectCategoriaChange} className="categorie" />

    <p className="txtCarrito"><strong>Precio del Paquete:</strong> 
        <input className="inputCarrito" type="text" placeholder="Precio del Paquete" 
        value={PrecioPaq} onChange={(e) => {setPrecioPaq(e.target.value)}}/></p>

    <p className="txtCarrito"><strong>Correo Electrónico de Contacto:</strong> 
        <input className="inputCarrito" type="email" placeholder="correo@ejemplo.com" 
        value={Correo} onChange={(e) => {setCorreo(e.target.value)}}/></p>

    <p className="txtCarrito"><strong>Teléfono de Contacto:</strong> 
        <input className="inputCarrito" type="tel"  placeholder="(123) 456-7890" 
        value={Telefono} onChange={(e) => {setTelefono(e.target.value)}}/></p>

    <p className="txtCarrito"><strong>Número de Personas:</strong> 
        <input className="inputCarrito" type="number" placeholder="Número de Personas" 
        value={NumPerso} onChange={(e) => {setNumPerso(e.target.value)}}/></p>

    <p className="txtCarrito"><strong>Selecciona la miniatura de tu Paquete:</strong>
        <input type="file" accept="image/*" name="foto" id="foto"/></p>
  </div>
  
</div>
<button className="buttonCarrito" onClick={registrarPaquete}>Confirmar</button>
</div>


    );
};
export default RegPaquete