//creando la conexion a la base de datos
const promise=require('bluebird');
const options={
    promiseLib:promise,
    query:(e)=>{}

}

const pgp=require('pg-promise')(options);
const types=pgp.pg.types;
types.setTypeParser(1114,function(stringValue){
    return stringValue;

});

const databaseConfig={
    'hos':'127.0.0.1',
    'port':5432,
    'database':'delivery_db',
    'user':'postgres',
    'password':'univalle123'
};

const db=pgp(databaseConfig);
module.exports=db;//ahora puedo llamar la bd desde cualesquier lugar

