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
    database:"basereact"
})

app.post("/create", (req, resp) => {
    const nomUsuario= req.body.nombreUsuario;
    const correo = req.body.correo;
    const contra= req.body.contra;

    db.query('INSERT INTO usuarios (correo, contra, nombre) VALUES (?,?,?)',
    [correo, contra, nomUsuario],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            resp.send("Empleado registrao con exito");
        }
    });


})


app.listen(3006, ()  =>{
    console.log("escuchando en el puerto 3006");
});
