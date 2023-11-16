const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());


const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"weddingPlanning"
});

app.post("/create", (req, resp) => {
    const nombreUsuario= req.body.nombreUsuario;
    const apellidoPUsuario= req.body.apellidoPUsuario;
    const apellidoMUsuario= req.body.apellidoMUsuario;
    const correo = req.body.correo;
    const contra= req.body.contra;
    const username= req.body.username;
    const telefonoUsuario= req.body.telefonoUsuario;
    const fechaNacUsuario= req.body.fechaNacUsuario;

    db.query('INSERT INTO Usuario (Nombre_Usuario, Apellido_Paterno_Usuario, Apellido_Paterno_Usuario, Correo_Usuario, Contrasenia_Usuario, Telefono_Usuario, Username, Fecha_Nacimiento) VALUES (?,?,?,?,?,?)',
    [nombreUsuario, apellidoPUsuario, apellidoMUsuario, correo, contra, telefonoUsuario, username, fechaNacUsuario],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            resp.send("Empleado registrado con exito");
        }
    });
});

app.post("/editarUser", (req, resp) => {
    const idUsuario= req.body.idUsuario;
    const nombreUsuario= req.body.nombreUsuario;
    const apellidoPUsuario= req.body.apellidoPUsuario;
    const apellidoMUsuario= req.body.apellidoMUsuario;
    const correo = req.body.correo;
    const contra= req.body.contra;
    const username= req.body.username;
    const telefonoUsuario= req.body.telefonoUsuario;
    const fechaNacUsuario= req.body.fechaNacUsuario;

    db.query('CALL SP_EditUsuario(?,?,?,?,?,?,?,?,?,?,?)',
    [idUsuario, nombreUsuario, apellidoPUsuario, apellidoMUsuario, correo, contra, telefonoUsuario, username, 1, 1, fechaNacUsuario],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            resp.send("Usuario modificado con exito");
        }
    });
});

app.post("/login", (req, resp) => {
    const correo = req.body.correo;
    const contra= req.body.contra;

    db.query('CALL SP_BuscarUsuario(?,?)',
    [correo, contra],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //resp.send(result);

            let resultado = JSON.parse(JSON.stringify(result[0]));
            resultado = resultado[0];

            console.log(resultado.mensaje + ": " + resultado.Username);
            resp.send(resultado);
        }
    });
});

app.post("/profile", (req, resp) => {
    const idUser = req.body.idUser;

    db.query('CALL SP_MostrarUsuario(?)',
    [idUser],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //resp.send(result);

            let resultado = JSON.parse(JSON.stringify(result[0]));
            //resultado = resultado[0];

            //console.log(resultado.Username);
            resp.send(resultado);
        }
    });
})

app.post("/deleteUser", (req, resp) => {
    const idUsuario= req.body.idUser;

    db.query('CALL SP_EliminLogUsuario(?)',
    [idUsuario],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            console.log("Usuario eliminado con exito");
            resp.send("Usuario eliminado con exito");
        }
    });
});

app.post("/deletePaquete", (req, resp) => {
    const idPaquete= req.body.idPaquete;

    db.query('CALL SP_CambiarEstadoPaquete(?)',
    [idPaquete],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //console.log("Usuario eliminado con exito");
            let resultado = JSON.parse(JSON.stringify(result[0]));
            resultado = resultado[0];

            //console.log(resultado.Mensaje);
            resp.send(resultado);
            //resp.send("Paquete eliminado con exito");
        }
    });
});


app.post("/sendMessage", (req, resp) => {
    const idUsuarioEmisor= req.body.idUsuarioE;
    const idUsuarioReceptor= req.body.idUsuarioR;
    const mensaje= req.body.mensaje;

    db.query('CALL SP_EnviarMensaje(?,?,?)',
    [idUsuarioEmisor, idUsuarioReceptor, mensaje],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            resp.send("Mensaje enviado con exito");
        }
    });
});

app.post("/MostrarMensajes", (req, resp) => {
    const idUsuarioEmisor= req.body.idUsuarioE;
    const idUsuarioReceptor= req.body.idUsuarioR;

    db.query('CALL SP_MostrarMensajes(?,?)',
    [idUsuarioEmisor, idUsuarioReceptor],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            resp.send(result);
        }
    });
});

app.post("/MostrarChats", (req, resp) => {
    const idUsuarioReceptor= req.body.idUsuarioR;

    db.query('CALL SP_MostrarChats(?)',
    [idUsuarioReceptor],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            resp.send(result);
        }
    });
});

app.post("/regPaquetes", (req, resp) => {
    const TituloPaq = req.body.TituloPaq;
    const DescripcionPaq= req.body.DescripcionPaq;
    const PrecioPaq= req.body.PrecioPaq;
    const CreadorPaq= req.body.CreadorPaq;
    const Correo= req.body.Correo;
    const Telefono= req.body.Telefono;
    const NumPerso= req.body.NumPerso;
    const ServicioPaq= req.body.ServicioPaq;

    db.query('CALL SP_RegPaquete(?,?,?,?,?)',
    [TituloPaq, DescripcionPaq, PrecioPaq, CreadorPaq, NumPerso],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            let resultado = JSON.parse(JSON.stringify(result[0]));
            resultado = resultado[0];

            ServicioPaq.map((valor) =>{                
                db.query('CALL SP_RegCategoriaPaquete(?,?)',
                [valor.value, resultado.Last_ID],
                (err, result) =>{
                    if(err){
                        console.log(err);
                    }
                });
            })

            resp.send(resultado);
        }
    });
});

app.post("/editPaquetes", (req, resp) => {
    const idPaq = req.body.idPaq;
    const TituloPaq = req.body.TituloPaq;
    const DescripcionPaq= req.body.DescripcionPaq;
    const PrecioPaq= req.body.PrecioPaq;
    const CreadorPaq= req.body.CreadorPaq;
    const Correo= req.body.Correo;
    const Telefono= req.body.Telefono;
    const NumPerso= req.body.NumPerso;
    const ServicioPaq= req.body.ServicioPaq;

    db.query('CALL SP_EditPaquete(?,?,?,?,?)',
    [idPaq, TituloPaq, DescripcionPaq, PrecioPaq, NumPerso],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //let resultado = JSON.parse(JSON.stringify(result[0]));
            //resultado = resultado[0];

            ServicioPaq.map((valor) =>{                
                db.query('CALL SP_RegCategoriaPaquete(?,?)',
                [valor.value, idPaq],
                (err, result) =>{
                    if(err){
                        console.log(err);
                    }
                });
            })

            resp.send("Se ha editado correctamente");
        }
    });
});

app.post("/MostrarPaquetes", (req, resp) => {
    const Categoria = req.body.Categoria;
    db.query('CALL SP_MostrarPaquetes(?)',
    [Categoria],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            console.log(Categoria);
            resp.send(result);
        }
    });
});

app.post("/MostrarPaqueteByID", (req, resp) => {
    const idPaquete = req.body.idPaquete;

    db.query('CALL SP_MostrarPaqueteByID(?)',
    [idPaquete],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //let resultado = JSON.parse(JSON.stringify(result[0]));
            resp.send(result);
        }
    });
});

app.post("/MostrarServiciosByPaqueteID", (req, resp) => {
    const idPaquete = req.body.idPaquete;

    db.query('CALL SP_MostrarServiciosByPaqueteID(?)',
    [idPaquete],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //let resultado = JSON.parse(JSON.stringify(result[0]));
            resp.send(result);
        }
    });
});

app.get("/MostrarServicios", (req, resp) => {

    db.query('CALL SP_MostrarCategoria()',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            resp.send(result);
        }
    });
});

app.post("/regCompraPaquete", (req, resp) => {
    const idPaquete = req.body.idPaquete;
    const idCliente = req.body.idCliente;
    const FechaEvento = req.body.FechaEvento;
    const HoraEvento = req.body.HoraEvento;
    const NombreCliente = req.body.NombreCliente;
    const CorreoCliente = req.body.CorreoCliente;
    const TelefonoCliente = req.body.TelefonoCliente;
    const NumPersonas = req.body.NumPersonas;
    const Comentarios = req.body.Comentarios;
    const PrecioPagado = req.body.PrecioPagado;

    db.query('CALL SP_RegCompraPaquete(?,?,?,?,?,?,?,?,?,?)',
    [idPaquete, idCliente, FechaEvento, HoraEvento, NombreCliente, CorreoCliente, TelefonoCliente, NumPersonas, Comentarios, PrecioPagado],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //let resultado = JSON.parse(JSON.stringify(result[0]));
            //resultado = resultado[0];

            resp.send(result);
        }
    });
});

app.post("/MostrarPaquetesComprados", (req, resp) => {
    const idUser = req.body.idUser;

    db.query('CALL SP_MostrarPaquetesComprados(?)',
    [idUser],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //let resultado = JSON.parse(JSON.stringify(result[0]));
            resp.send(result);
        }
    });
});

app.post("/MostrarPaquetesVendidos", (req, resp) => {
    const idUser = req.body.idUser;

    db.query('CALL SP_MostrarPaquetesVendidos(?)',
    [idUser],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //let resultado = JSON.parse(JSON.stringify(result[0]));
            resp.send(result);
        }
    });
});

app.post("/MostrarPaquetesVendidosByID", (req, resp) => {
    const idPaquete = req.body.idPaquete;

    db.query('CALL SP_MostrarPaqueteVendidoByID(?)',
    [idPaquete],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //let resultado = JSON.parse(JSON.stringify(result[0]));
            resp.send(result);
        }
    });
});

app.post("/MostrarMisPaquetes", (req, resp) => {
    const idUser = req.body.idUser;

    db.query('CALL SP_MostrarMisPaquetes(?)',
    [idUser],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //let resultado = JSON.parse(JSON.stringify(result[0]));
            resp.send(result);
        }
    });
});

app.post("/MostrarHistorialPago", (req, resp) => {
    const idUser = req.body.idUser;
    const idPaqueteComprado = req.body.idPaqueteComprado;

    db.query('CALL SP_MostrarHistorialPagoByID(?,?)',
    [idUser, idPaqueteComprado],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //let resultado = JSON.parse(JSON.stringify(result[0]));
            resp.send(result);
        }
    });
});

app.post("/regPagoPaq", (req, resp) => {
    const idPaqueteComprado = req.body.idPaqueteComprado;
    const PrecioPagado= req.body.PrecioPagado;

    db.query('CALL SP_RegPagoPaquete(?,?,?)',
    [idPaqueteComprado, PrecioPagado, 0],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            //resp.send(result);

            let resultado = JSON.parse(JSON.stringify(result[0]));
            resultado = resultado[0];
            resp.send(resultado);
        }
    });
});

app.listen(3001, ()  =>{
    console.log("escuchando en el puerto 3001");
});
