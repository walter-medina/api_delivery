//me traigo el controllers donde esta toda la info:
const UserController=require('../controllers/usersControllers');
//aquí llamo al controlador y creo las rutas:

module.exports=(app)=>{
    app.get('/api/users/getAll',UserController.getAll);
    app.post('/api/users/create',UserController.register);
    
}
