import React from "react";
import './Styles/historial.css';

const Historial = () =>{
    return(
<div className="historial">
<h1 class="tituloHistorial">Historial de pagos</h1>
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Estado</th>
      <th>Importe</th>
      <th>Fecha</th> 
      <th>Cliente</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>1</td>
      <td>Estado 1</td>
      <td>$100.00</td>
      <td>2023-10-01</td>
      <td>ejemplo@gmail.com</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Estado 2</td>
      <td>$75.50</td>
      <td>2023-10-02</td>
      <td>ejemplo2@gmail.com</td> 
    </tr>
  </tbody>
</table>

</div>
    );
};

export default Historial