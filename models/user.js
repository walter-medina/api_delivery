const db=require('../config/config');
const bcript=require('bcryptjs');
const User={

//para hacer consultas a la tabla user
}

//para hacer busqueda por un usuario determinado y poderse loguear
User.findById=(id, callback)=>{
    const sql=`select id,email,name, lastname,image,phone, password, session_token from users where id=$1`;
    return db.oneOrNone(sql,id).then(user=>{callback(null, user)});
}

User.findByEmail=(email)=>{
    const sql=`select id,email,name, lastname,image,phone, password, session_token from users where email=$1`;
    return db.oneOrNone(sql,email);

}
//consulta sql para obtener los usuarios de la bd
User.getAll=()=>{
    const sql=`SELECT * FROM  users`;
    return db.manyOrNone(sql);
}

//metodo con la consulta para crear usuario en la bd, el metodo recibe el usuario dado por el cliente
User.createUser=async (user)=>{

    const hash=await bcript.hash(user.password, 10);

    const sql=`INSERT INTO users(email,name,lastname,phone,image,password,create_at,update_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
    return db.oneOrNone(sql,[
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        hash,
        new Date(),
        new Date()
    ]);

}
module.exports=User;