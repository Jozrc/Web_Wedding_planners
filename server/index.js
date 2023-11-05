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
            resp.send("Empleado registrao con exito");
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


app.listen(3001, ()  =>{
    console.log("escuchando en el puerto 3001");
});
