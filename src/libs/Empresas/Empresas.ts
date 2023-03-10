//La interfaz es la que define una estructura de datos
export interface IEmpresas{
    codigo: string;
    nombre: string;
    status: string;
    created?: Date;
    updated?: Date;
    observacion?: string;
}

export class empresas {
    /*private currentEmpresa: IEmpresas ={
        codigo: "",
        nombre: "",
        status: "",
        created: undefined,
        updated: undefined
    }*/

    private empresas: IEmpresas[]; //Arreglo de IEmpresas por los []
    constructor(){ //Función predeterminada que existe y sirve para inicializar
        this.empresas = [];
    }
    add(nuevaEmpresa : IEmpresas){
        const date = new Date();
        const nueva: IEmpresas = {
            ...nuevaEmpresa, 
            codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
            created: date,
            updated: date
        }
        this.empresas.push(nueva);
        return true;
    }

    getAll(){
        return this.empresas;
    }

    getById(codigo:string){
        const empresaToReturn = this.empresas.find((emp)=>{
            return emp.codigo === codigo;
        });
        return empresaToReturn;
    }   

    update(updateEmpresa: IEmpresas){
        const newEmpresas: IEmpresas[] = this.empresas.map((emp)=>{
            if (emp.codigo === updateEmpresa.codigo){
                return {... emp, ...updateEmpresa, updated: new Date()};
            }
            return emp;
        });
        this.empresas = newEmpresas;
        return true;
    }

    delete(codigo:string){
        const empresaToDelete = this.empresas.find((emp)=>{
            return emp.codigo === codigo;
        });
        if(empresaToDelete){
            const newEmpresa: IEmpresas[] = this.empresas.filter((emp)=>{ //.filter es quien elimina el código
                return emp.codigo !== codigo;
            });
            this.empresas = newEmpresa;
            return true;
        }
        return false;
    }
}