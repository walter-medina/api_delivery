const db=require('../config/config');
const User={

//para hacer consultas a la tabla user
}


//consulta sql para obtener los usuarios de la bd
User.getAll=()=>{
    const sql=`SELECT * FROM  users`;
    return db.manyOrNone(sql);
}

//metodo con la consulta para crear usuario en la bd, el metodo recibe el usuario dado por el cliente
User.createUser=(user)=>{
    const sql=`INSERT INTO users(email,name,lastname,phone,image,password,create_at,update_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
    return db.oneOrNone(sql,[
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date()
    ]);

}
module.exports=User;