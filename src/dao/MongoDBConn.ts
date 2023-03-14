import { IDBConnection } from "./IDBConnection";
import { MongoClient } from "mongodb";

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017'
//'mongodb://localhost:27017'; /* En caso de que no funcione */
const mongoDBName = process.env.MONGO_DB_NAME || 'sw_202301';

export class MongoDBConn implements IDBConnection {
    static connection:MongoClient = null;
      private constructor(){}
  getConnection(): Promise<any> {
    throw new Error("Method not implemented.");
  }
      public static async getConnection(){
          if(!this.connection){
        this.connection = await MongoClient.connect(mongoURI);
          }
      return this.connection.db(mongoDBName);
    }
}