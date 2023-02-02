import express from 'express';
const router = express.Router();

import { empresas, IEmpresas } from '@libs/Empresas/Empresas';
/*import { empresas, IEmpresas } from '@libs/Empresas/Empresas'; */

/*Más información en Vid_30012023_SW_202301 */

const empresasModel = new empresas();

empresasModel.add({
    codigo: '',
    nombre: 'Mi empresa',
    status: 'activo'
});

//Registrar los endpoint en router
//http://localhost:3001/empresas
router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll":{"method":"get","url":"empresas/all"},
        "getById":{"method":"get","url":"empresas/byid/:id"},
        "new":{"method":"post","url":"empresas/new"},
        "update":{"method":"put","url":"empresas/upd/:id"},
        "delete":{"method":"delete","url":"empresas/del/:id"}
    }
    res.status(200).json(jsonUrls);
});  //definir el método http

router.get('/all',(_req,res)=>{
    res.status(200).json(empresasModel.getAll());
});

router.post('/new',(req,res)=>{
    console.log("Empresas /new request body:", req.body);

    const { 
        nombre = "John Doe Corp", 
        status = "Activo" 
    } = req.body;

    //Todo: Validar Entrada de datos
    const newEmpresa: IEmpresas = {
        codigo: "",
        nombre,
        status 
    };

    if(empresasModel.add(newEmpresa)){
        res.status(200).json({"created":true});
    }
    return res.status(404).json(
        {"Error":"Error al agregar una nueva empresa"}
    );

});

router.put('/upd/:id',(req,res)=>{
    const { id } = req.params;

    const {
        nombre="John Doe Corp",
        status="Activo",
        observacion = ""
    } = req.body;

    const UpdateEmpresa:IEmpresas={
        codigo:id,
        nombre,
        status,
        observacion
    };

    if(empresasModel.update(UpdateEmpresa)){
        return res.status(200).json({"update":true});
    }
    return res.status(404).json({"Error":"Error al actualizar empresa"});
});

router.delete('/del/:id', (req,res)=>{
    const {id : codigo} = req.params; //Del objeto params (objeto json) se obtendrá id y se llamará codigo con dos puntos (:)
    if(codigo){
        if(empresasModel.delete(codigo)){
            return res.status(200).json({"Deleted":true});
        }
    }
    return res.status(404).json({"error":"No se pudo eliminar Empresa"});
});

router.get('/byid/:id',(req,res)=>{
    const {id:codigo}=req.params;
    const empresa = empresasModel.getById(codigo);
    if(empresa){
        return res.status(200).json(empresa);
    }
    return res.status(404).json({"error":"No se encontró la Empresa"});
})


/*router.get('/all', function(_req, res)=>{
    res.status(200).json{'msg':'Not Implemented yet'};
});*/

export default router;