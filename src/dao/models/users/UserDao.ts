import {MongoDAOBase} from '@dao/MongoDAOBase';
import { IDBConnection } from '@dao/IDBConnection';
import { IUsers } from './IUser';
export class UserDao extends MongoDAOBase<IUsers> {
  constructor(conexion: IDBConnection){
      super("users", conexion);
  }
}