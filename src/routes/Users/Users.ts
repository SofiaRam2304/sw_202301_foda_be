import express from 'express';
const router = express.Router();
import { UserDao } from '@dao/models/users/UserDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IUsers } from '@dao/models/users/IUser';
import { Users } from '@libs/users/Users';
const usersDao = new UserDao(MongoDBConn);
let usersModel:Users;

usersDao.init().then(()=>{
    usersModel = new Users(usersDao);
});

router.get('/',(_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get", "url":"user/all"},
        "getById": {"method":"get", "url":"user/byid/:id"},
        "new":{"method":"post", "url":"user/new"},
        "update": {"method":"put", "url":"user/upd/:id"},
        "delete":{"method":"delete", "url":"user/del/:id"}
    }
    res.status(200).json(jsonUrls);

});

router.get('/all', async(_req, res)=>{
    res.status(200).json(await usersModel.getAll());
    });

router.get('/byid/:id',async(req,res)=>{
    const { id:codigo } = req.params;
    const user= await usersModel.getById(codigo);
    
    if(user){
        return res.status(200).json(user);
    }
    return res.status(404).json({"Error":"Usuario No Encontrado"});
});

router.post('/new', async (req, res) => {
   console.log("Users /new req body:", req.body);
   
   const{
    codigo = "NA",
    correo = "Jonh@gmail.com",
    nombre = "Jonh Doe Corp",
    password = "123",
    roles = []
   }= req.body;

   const newUser: IUsers = {
    codigo, 
    correo,
    nombre,
    password,
    roles,
   }

   if (await usersModel.add(newUser)){
    return res.status(200).json({"created":true});
   }

   return res.status(404).json(
    {"error":"No se pudo agregar al nuevo Usuario"}
   );
});

router.put('/upd/:id',async (req, res) => {
    const {id} = req.params;
    const {
        codigo ="",
        correo = "----NotRecieved------",
        nombre = "----NotRecieved------",
        password = "----NotRecieved------",
        roles = [],
        observacion = ""
    } = req.body;

    if (
        correo === "----NotRecieved------"
        || nombre === "----NotRecieved------"
        || password === "----NotRecieved------"
    ) {
        return res.status(403).json({"Error":"Agregar un Nombre, un Correo y una contraseña"});
    }

    const updateUser: IUsers={
        codigo,
        correo,
        nombre,
        password,
        roles,
        observacion
    };

    if(await usersModel.update(id, updateUser)){
        return res.status(200).json({"updated":true});
    }
    return res.status(404).json({"Error":"No se actualizó el Usuario"});

});

router.delete('/del/:id',async (req, res) => {
    const {id:codigo}=req.params;
    if(await usersModel.delete(codigo)){
        return res.status(200).json({"delete":true});
    }
    return res.status(404).json({"Error":"No se Eliminó el Usuario"});
});

export default router;