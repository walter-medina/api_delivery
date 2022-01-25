//CREANDO  EL SERVIDOR EN NODE CON EXPRESS
const express=require('express');//otra manera de importar expres
//import express from "express";//forma actual
const logger=require('morgan');
const cors=require('cors');
const http=require('http');
const app=express();
const server=http.createServer(app);

//exportando arichivo userRoutes donde estan las turas;
const users=require('./routes/usersRoutes');
//const User = require('./models/user');


const port=process.env.PORT || 3000;//creando el puerto por donde vamos a escuchar
//librerías que usa app
app.use(logger('dev'));
app.use(express.json());//parcear respuestas en formato json
app.use(express.urlencoded({
    extended:true

}));
app.use(cors());
app.disable('x-powered-by');
app.set('port',port);

//llamando a las rutas:
users(app);

server.listen(3000,'192.168.10.17'|| 'localhost',function(){
    console.log("aplicacion de nodejs " + port + " iniciada");

});


//manejo de errores:
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);

});

module.exports={
    app:app,
    server:server
}





