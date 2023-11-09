import React from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Styles/login.css';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
let idUser = -1;


function cerrarSesion(){
  cookies.remove('idUser', {path: "/"});
}

function NavScrollExample() {
  let button;
  //Verificar si existe un usuario logueado
  if(cookies.get('idUser') != null){
    idUser = cookies.get('idUser');
    button = <Nav.Link href="/login" className="ms-2" style={{ color: "red" }}>Logout</Nav.Link>;
    console.log("idUsuario: " + idUser);
  }
  else{
    idUser = -1;
    button = <Nav.Link href="/login" className="ms-2" style={{ color: "red" }}>Login</Nav.Link>;
  }

  return (
    
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/" className="Nav-titulo">Wedding planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/perfil">Profile</Nav.Link>
            <NavDropdown title="Más" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/compra">Compras</NavDropdown.Item>
              <NavDropdown.Item href="/historial">
                Historial de Pagos
              </NavDropdown.Item>
              <NavDropdown.Item href="/chat">
                Chats
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <button className="button-search" >Search</button>
          </Form>

          {}

          {idUser !== -1? 
            <Nav.Link href="/" onClick={cerrarSesion} className="ms-2" style={{ color: "red" }}>Logout</Nav.Link>  
          : 
          <Nav.Link href="/login" className="ms-2" style={{ color: "red" }}>Login</Nav.Link>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default NavScrollExample;
