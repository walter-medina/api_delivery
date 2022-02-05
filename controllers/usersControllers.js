const User=require('../models/user');
// aque hago los diferentes métodos, logica de la aplicacion
module.exports={

    //obtiene los usuarios de la bd
    async getAll(req, res,next){
        try{
            const data=await User.getAll();//me traigo todos los datos de la bd, el await espera que se traiga todos los usuario, una vez termine sigue con la siguiente lienea
            
            console.log(`Usarios:${data}`)
            return res.status(200).json(data);

        }catch(error){

            console.error(`Error:${error}`);
            return res.status(501).json({
                success:false,
                message:'error'               

            });
        }

    },

    async register(req, res,next){

        try{
            const user=req.body;//capturo lo que el cliente envía, hago una solicitud al cliente
            const data=await User.createUser(user);
            return res.status(201).json({
                success:true,
                message:'registro exitoso',
                data:{
                    'id':data.id
                }

            });           

        }catch(error){
            console.error(`Error:${error}`);
            return res.status(501).json({
                success:false,
                message:'error al registrar usuario',
                error:error             

            });          
        }

    }

    //registrar usuarios en la base de datos

}
