import React, { useState } from "react";
import Select from 'react-select';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Styles/carrito.css';
import imgCarrito from "./images/anillos2.jpg"

import Cookies from 'universal-cookie';
const cookies = new Cookies();
let idUser = -1, paso = false;

const RegPaquete = () => {
  const params = useParams();
  let idPaquete = params.idPaquete;

  const [ServicioSelectedOptions, setServicoSelectedOptions] = useState([]);

  const [listaServicios, setListaServicios] = useState([]);

  const [TituloPaq, setTituloPaq] = useState('');
  const [DescripcionPaq, setDescripcionPaq] = useState('');
  const [PrecioPaq, setPrecioPaq] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [NumPerso, setNumPerso] = useState('');

  const [file, setFile] = useState('');
  const [subirImagen, setSubirImagen] = useState(false);

  const mostrarServicios = () => {
    axios.get("http://localhost:3001/MostrarServicios", {
    }).then((response)=>{
      if(response.data[0].length > 0){
        setListaServicios(response.data[0]);
      };
    }
  )};

  const mostrarPaquete = () => {
    axios.post("http://localhost:3001/MostrarPaqueteByID", {
        idPaquete: idPaquete,
    }).then((response)=>{
        if(response.data[0].length > 0){
            let resultado = response.data[0];
            resultado = resultado[0];

            setTituloPaq(resultado.Titulo_Paquete);
            setDescripcionPaq(resultado.Descripcion_Paquete);
            setNumPerso(resultado.Capacidad);
            setPrecioPaq(resultado.Precio_Paquete);
            //setidCreadorPaq(resultado.Creador_Paquete);
        };
    })

    axios.post("http://localhost:3001/MostrarServiciosByPaqueteID", {
        idPaquete: idPaquete,
    }).then((response)=>{
        if(response.data[0].length > 0){
            let resultado = response.data[0];

            const optionsServicioSelected = resultado.map((opcion) => ({
              value: opcion.idCategoria,
              label: opcion.Nombre_categoria,
            }));

            setServicoSelectedOptions(optionsServicioSelected);
        };
    })
  };


  if(cookies.get('idUser') == null){
    window.location.href="/";
    return;
  }
  else{
      idUser = cookies.get('idUser');
      if(!paso){
        mostrarServicios();
        if(idPaquete != null){
          mostrarPaquete();
        }
        paso = true;
      }
  }

  const handleSelectServicioChange = (selected) => {
    setServicoSelectedOptions(selected);
    console.log(selected);
  };

  const optionsServicio = listaServicios.map((opcion) => ({
    value: opcion.idCategoria,
    label: opcion.Nombre_categoria,
  }));

  const registrarPaquete = () => {
    axios.post("http://localhost:3001/regPaquetes", {
      TituloPaq: TituloPaq,
      DescripcionPaq: DescripcionPaq,
      PrecioPaq: PrecioPaq,
      CreadorPaq: idUser,
      Correo: Correo,
      Telefono: Telefono,
      NumPerso: NumPerso,
      ServicioPaq:ServicioSelectedOptions
    }).then((response)=>{
      let respuesta = response.data;

      if (respuesta.Last_ID != ''){
        const formData = new FormData();
        formData.append('imagen', file);
        formData.append('idPaquete', respuesta.Last_ID);

        axios.post("http://localhost:3001/editarImagenPaquete", formData)
        .then((response)=>{
          alert("Paquete Registrado");
          window.location.href="/";
        });
      }
      else{
        alert(respuesta.mensaje);
      }
    }
  )};

  const editarPaquete = () => {
    axios.post("http://localhost:3001/editPaquetes", {
      idPaq: idPaquete,
      TituloPaq: TituloPaq,
      DescripcionPaq: DescripcionPaq,
      PrecioPaq: PrecioPaq,
      CreadorPaq: idUser,
      Correo: Correo,
      Telefono: Telefono,
      NumPerso: NumPerso,
      ServicioPaq:ServicioSelectedOptions

    }).then((response)=>{
      if(subirImagen == true){
        const formData = new FormData();
        formData.append('imagen', file);
        formData.append('idPaquete', idPaquete);

        axios.post("http://localhost:3001/editarImagenPaquete", formData)
        .then((response)=>{
          alert("Paquete Editado");
          window.location.href="/misPaquetes";
        });
      }
      else{
        alert("Paquete Editado");
        window.location.href="/misPaquetes";
      }
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
      <Select isMulti options={optionsServicio} placeholder="Selecciona un servicio" 
      value={ServicioSelectedOptions} onChange={handleSelectServicioChange} className="categorie" />

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

      {
        idPaquete!=null?<>
          <p className="txtCarrito"><strong>Cambiar Imagen: </strong>
          <input type="checkbox" className="passw" id="subirImagen" name="subirImagen" value={subirImagen}
            onChange={(e) => {setSubirImagen(subirImagen==false?true:false)}}/></p>
        </>:<></>
      }

    <p className="txtCarrito"><strong>Selecciona la miniatura de tu Paquete:</strong>
        <input type="file" accept="image/*" name="foto" id="foto"
          onChange={(e) => {setFile(e.target.files[0])}}/></p>
  </div>
  
</div>
<button className="buttonCarrito" onClick={ idPaquete==null?registrarPaquete:editarPaquete}>Confirmar</button>
</div>


    );
};
export default RegPaquete