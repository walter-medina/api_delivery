const User=require('../models/user');
const bcript=require('bcryptjs');
const jwt=require('jsonwebtoken');
const keys=require('../config/keys');
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

    //registrar usuarios en la base de datos
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

    },

    async login(req, res,next){
        try{

            const email= req.body.email;
            const password=req.body.password;
            const myUser=await User.findByEmail(email);//me trae todo un objeto

            if(!myUser){
                return res.status(401).json({
                    success:false,
                    message:"el email no fue encontrado"
                })
            }

            const isPasswordValid=await bcript.compare(password,myUser.password);
            
            if(isPasswordValid){
                const token=jwt.sign({
                    id:myUser.id,
                    email:myUser.email
                },keys.secrerOrKey,{
                    //expiresIn:
                })

                const data={
                    id:myUser.id,
                    name:myUser.name,
                    lasname:myUser.lasname,
                    email:myUser.email,
                    phone:myUser.phone,
                    image:myUser.image,
                    session_token:`JWT ${token}`

                    
                };

                return res.status(201).json({
                    success:true,
                    message:'el usuario ha sido autenticado',
                    data:data
                });


            }
            else{
                return res.status(401).json({
                    success:false,
                    message:'constraseña incorrecta',
                
                });


            }


        }catch(error){
            console.error(`Error:${error}`);
            return res.status(501).json({
                success:false,
                message:'Error al loguearse',
                error:error   

        });

    }

    

    }

}
