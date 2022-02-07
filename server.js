//CREANDO  EL SERVIDOR EN NODE CON EXPRESS
const express=require('express');//otra manera de importar expres
//import express from "express";//forma actual
const morgan=require('morgan');//para que me muestre en consola informacion
const cors=require('cors');
const http=require('http');
const app=express();
const server=http.createServer(app);

//exportando arichivo userRoutes donde estan las turas;
const users=require('./routes/usersRoutes');
//const User = require('./models/user');

//exportando el passport para usar jwt
const passport=require('passport')


const port=process.env.PORT || 3000;//creando el puerto por donde vamos a escuchar
//librerías que usa app
app.use(morgan('dev'));
app.use(express.json());//parcear respuestas en formato json
app.use(express.urlencoded({
    extended:true

}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');
app.set('port',port);

//llamando a las rutas:
users(app);

server.listen(8080,'10.142.11.251'|| 'localhost',function(){
    console.log("aplicacion de nodejs " + port + " iniciada");

});
/*server.listen(app.get('port'),()=>{
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
})*/


//manejo de errores:
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);

});

module.exports={
    app:app,
    server:server
}





