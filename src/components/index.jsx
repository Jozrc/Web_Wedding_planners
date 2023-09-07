import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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

<div className='fondo'>
    <div className='articulo'>
    
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
  {Array.from({ length: 9 }).map((_, index) => (
    <Card key={index} style={{ width: '30%', marginBottom: '20px' }}>
      <Card.Img variant="top" src={Imagenlogo} />
      <Card.Body>
        <Card.Title>Evento {index + 1}</Card.Title>
        <Card.Text>
          ej. de resumen de un evento.....
          <br />
          Imaginemos que son fotos diferentes xd
        </Card.Text>
        <button className='button'>Ver más</button>
      </Card.Body>
    </Card>
  ))}
</div>

</div>
    
    </div>

    </div>
    
  );
}

export default HeaderAndFooterExample;