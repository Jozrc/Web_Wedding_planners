import React from "react";
import { Link } from 'react-router-dom';
import './Styles/planner.css';


const Planner = () => {
    return (
    
<section class="container-plannerperfil">

    <div className="box">

    <h1 className="titulo">Titulo Planner</h1>

	<div class="slider-wrapper">
		<div class="slider">
			<img id="slide-1" src="https://th.bing.com/th/id/R.c0d6579db3e43dde124453d6a6da719f?rik=nkvbssUguhb3pg&riu=http%3a%2f%2frestaurante-bodas.com%2fwp-content%2fuploads%2f2014%2f09%2f01-Boda-Los-Claustros-de-Ayllon.jpg&ehk=mamVI3CNlfoxbQIOJTDP1k6bds06S4ZUHID%2bsy2Erg0%3d&risl=&pid=ImgRaw&r=0" alt="3D rendering of an imaginary orange planet in space" />
			<img id="slide-2" src="https://i.pinimg.com/originals/e8/63/72/e8637224fdf6e4941dad20b6608d31cb.jpg" alt="3D rendering of an imaginary green planet in space" />
			<img id="slide-3" src="https://www.myhotelwedding.com/wp-content/uploads/2017/09/Kasey-Carl-1299.jpg" alt="3D rendering of an imaginary blue planet in space" />
		</div>
		<div class="slider-nav">
			<a href="#slide-1"></a>
			<a href="#slide-2"></a>
			<a href="#slide-3"></a>
		</div>

	</div>

    <div className="descricion-box">

    <h2 className="titulo">Sub-titulo</h2>

     <p className="descricion">

     Un planificador de bodas, también conocido como coordinador de bodas o wedding planner en inglés, es un profesional especializado en la planificación, organización y ejecución de bodas. Su principal objetivo es ayudar a las parejas de novios a convertir sus sueños y visiones de una boda perfecta en una realidad sin problemas. Aquí tienes una descripción de un wedding planner:

Un wedding planner es un experto en bodas altamente capacitado y apasionado por crear experiencias inolvidables para las parejas de novios. Su rol es versátil y abarca una amplia gama de responsabilidades, que incluyen:

1. Consulta Inicial: El wedding planner se reúne con la pareja para entender sus deseos, necesidades y expectativas. Escucha sus ideas, preferencias y presupuesto.

2. Planificación: Con base en la información proporcionada por la pareja, el wedding planner desarrolla un plan detallado para la boda. Esto incluye la selección de ubicaciones, proveedores (como fotógrafos, floristas, caterers, músicos, etc.), fechas, horarios y un presupuesto.

3. Coordinación: Durante el proceso de planificación, el wedding planner actúa como intermediario entre la pareja y los proveedores. Coordina citas, contratos, pagos y asegura que todo esté alineado con el plan.

4. Diseño y Decoración: Ayuda a crear una visión cohesiva para la boda, incluyendo la selección de temas, colores y decoraciones que reflejen el estilo de la pareja. Se encarga de que la estética general sea armoniosa.

5. Logística: Organiza todos los aspectos logísticos de la boda, desde la gestión de invitaciones y RSVP hasta la coordinación de horarios de ceremonias y recepciones, transporte de invitados, y más.

6. Solución de Problemas: Está preparado para manejar imprevistos y problemas que puedan surgir en el día de la boda, manteniendo la calma y encontrando soluciones rápidas para garantizar que todo salga sin problemas.

7. Supervisión en el Día de la Boda: El día de la boda, el wedding planner se asegura de que todo funcione de acuerdo al plan. Coordina el flujo de eventos, supervisa la configuración y se asegura de que los proveedores cumplan con sus responsabilidades.

8. Reducción de Estrés: Una de las principales funciones de un wedding planner es reducir el estrés de la pareja, permitiéndoles disfrutar plenamente de su día especial sin preocuparse por los detalles.

En resumen, un wedding planner es un profesional altamente organizado y con un gran ojo para el detalle que trabaja incansablemente para llevar a cabo una boda perfecta. Su objetivo principal es hacer que el proceso de planificación y el día de la boda sean lo más sin problemas y agradables posible para la pareja de novios.
     </p>
    </div>

<div className="descricion-box">

<ul className="opciones-planner">
    <li>Contacto</li>
    <li>Reservacion</li>
    <li>Ayuda</li>
  </ul>

</div>

    </div>

</section>

    );
  };
  
  export default Planner