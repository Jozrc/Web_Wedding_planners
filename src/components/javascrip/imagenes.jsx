const imagenes = [
    'C:\\Users\\oxiel\\OneDrive\\Desktop\\WEB-2\\front-web2\\src\\components\\images\\imag3.jpg',
    'C:\\Users\\oxiel\\OneDrive\\Desktop\\WEB-2\\front-web2\\src\\components\\images\\img2.png',
    'C:\\Users\\oxiel\\OneDrive\\Desktop\\WEB-2\\front-web2\\src\\components\\images\\imag3.jpg',
  ];
  
  let indiceImagenActual = 0; // Agrega esta variable para mantener un seguimiento del índice actual
  
  function cambiarImagen(direccion) {
    if (direccion === 'izquierda') {
      // Verifica si es un cambio hacia la izquierda
      if (indiceImagenActual > 0) {
        indiceImagenActual -= 1; // Decrementa el índice para retroceder
      } else {
        indiceImagenActual = imagenes.length - 1; // Vuelve a la última imagen si está en la primera
      }
    } else if (direccion === 'derecha') {
      // Verifica si es un cambio hacia la derecha
      if (indiceImagenActual < imagenes.length - 1) {
        indiceImagenActual += 1; // Incrementa el índice para avanzar
      } else {
        indiceImagenActual = 0; // Vuelve a la primera imagen si está en la última
      }
    }
  
    // Devuelve la ruta de la imagen actual
    return imagenes[indiceImagenActual];
  }
  
  export { imagenes, cambiarImagen };