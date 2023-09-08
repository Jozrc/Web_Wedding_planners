import miImagen from "./images/banmer.jpg";
import Imagenlogo from "./images/register.png";
import './Styles/index.css';

function HeaderAndFooterExample() {
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
    
     <div className="planner">

     <img src={miImagen} alt="Descripción de la imagen" className="imagen-planner"/>
     <h1 className="titulo-planner">Titulo-Nombre</h1>
     <p className="descripcion">Descripcion: 
     Bienvenidos a "Amor Eterno", un evento mágico diseñado y coordinado por nuestro experimentado equipo
     de wedding planners. Esta es una celebración única y personalizada que marca el inicio de una vida
     juntos llena de amor y promesas. En "Amor Eterno", creamos un entorno encantador donde los sueños se
     hacen realidad y los corazones se unen en un día inolvidable.</p>
     <button className="button-planner">Ver más</button>
     
     </div>

    <div className="planner">

     <img src={miImagen} alt="Descripción de la imagen" className="imagen-planner"/>
     <h1 className="titulo-planner">Titulo-Nombre</h1>
     <p className="descripcion">Descripcion: 
     Bienvenidos a "Amor Eterno", un evento mágico diseñado y coordinado por nuestro experimentado equipo
     de wedding planners. Esta es una celebración única y personalizada que marca el inicio de una vida
     juntos llena de amor y promesas. En "Amor Eterno", creamos un entorno encantador donde los sueños se
     hacen realidad y los corazones se unen en un día inolvidable.</p>
     <button className="button-planner">Ver más</button>
     
     </div>

    </div>

</div>
    
  );
}

export default HeaderAndFooterExample;