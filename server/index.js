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
})

app.post("/create", (req, resp) => {
    const nombreUsuario= req.body.nombreUsuario;
    const apellidoUsuario= req.body.apellidoUsuario;
    const correo = req.body.correo;
    const contra= req.body.contra;
    const telefonoUsuario= req.body.telefonoUsuario;
    const fechaNacUsuario= req.body.fechaNacUsuario;

    db.query('INSERT INTO Usuario (Nombre_Usuario, Apellido_Paterno_Usuario, Correo_Usuario, Contrasenia_Usuario, Telefono_Usuario, Fecha_Nacimiento) VALUES (?,?,?,?,?,?)',
    [nombreUsuario, apellidoUsuario, correo, contra, telefonoUsuario, fechaNacUsuario],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            resp.send("Empleado registrao con exito");
        }
    });
})


app.post("/login", (req, resp) => {
    const correo = req.body.correo;
    const contra= req.body.contra;

    db.query('CALL SP_BuscarUsuario(?,?)',
    [correo, contra],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            console.log(result[0]);

            if (result[0].mensaje = ' '){
                resp.send("Empleado encontrado con exito");
                console.log("Encontrado el usuario " + result[0].idUsuario);
                return true;
            }
            else{
                resp.send("Empleado no encontrado");
                console.log("Empleado no encontrado" + result[0].mensaje);
                return false;
            }
            
        }
    });
})


app.listen(3001, ()  =>{
    console.log("escuchando en el puerto 3001");
});
