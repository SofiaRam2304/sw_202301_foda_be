import { IDataAccessObject } from "@server/dao/IDataAccesObject";
import { UserDao } from "@dao/models/users/UserDao";
import { IUsers } from "@server/dao/models/users/IUser";

export class Users {
  private userDao: UserDao;
  constructor(user: IDataAccessObject) {
    this.userDao = user as UserDao;
  }

  getAll(){
    return this.userDao.findAll();
  }

  getById(id:string){
    return this.userDao.findByID(id);
  }

  add(newUser: IUsers){
    const date = new Date();
    const usuario: IUsers ={
      ...newUser,
      creado: date,
      ultimoAcceso: date
    }
    return this.userDao.create(usuario);
  }

  update(id: string, updateUser: IUsers){
    const updateObject = {...updateUser, ultimoAcceso:new Date()};
    return this.userDao.update(id, updateObject);
  }

  delete(id: string){
    return this.userDao.delete(id);
  }
}