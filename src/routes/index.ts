import express from 'express';
const router  = express.Router();


import empresasRouter from './empresas/empresas';
import usuariosRouter from './usuarios/usuarios';
//REST API
//INTERNET -> HTTP -> REST API -> DB
//SOAP XML wsdl
// {} -> JSON
// [] -> JSON
// { llave : valor }
// Valor: Texto, numérico, booleano, Array [valores], objeto {llave:valor}

//Rest -> también llamado REST STATELESS
//utiliza algo llamado resource unique representation

/*
  Hay 32 métodos que http maneja y que están definidas en la especificación de
  http, y el navegador lo que hace es ejecutarlas mediante las que están definidas. 
  El papel de esto es de los Routes o Rutas de la Aplicación.

  Los métodos utilizados para los CRUD son:
    POST = Create
    GET = Read
    PUT = Update
    DELETE = Delete
*/

router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 router.get('/version',(_req, res)=>{
  const version: string = "1.0.0"; //siempre va a ser un string esta constante
  //string, number, boolean, types, interfaces, classes, enumerators
  const jsonResp = {"name" : "FODA be", "version":version};  
  res.json(jsonResp);
});

router.use('/empresas', empresasRouter);

router.use('/usuarios', usuariosRouter);

import fodaRouter from './FODA/Foda';
router.use('/foda', fodaRouter);
 //router.get  router.post router.put router.delete  router.use

import usersRoute from './Users/Users';
router.use('/Users', usersRoute);

//router.get  router.post  router.put  router.delete  router.use

export default router;
