const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb')
const {IDatabase} = require("./AdapterDatabase")
const ConfigService = require('./ConfigService');


const getClient = () => {

    const config = new ConfigService()
    const user = config.get('database.user')
    const password = config.get('database.password')
    const host= config.get('database.host')

    const uri = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`;
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}); 
return client;
};





class MongoService extends IDatabase{

    constructor(){
        super();
        console.log('Mongo service')
    }

    async findAll(collectionName) {
        const client = getClient()
        try{
            await client.connect();
            const dbName = config.get('database.name')
            const database = client.db(dbName)
            const collection = database.collection(collectionName)
        /// Ejecutar comandos 
    
        const rows = await collection.find().toArray()
        return rows
        
    
        }catch(error){
            console.error(error);
            throw{success:false,message:'Error Mongo service'}
        }
        finally{
            await client.close();
        }
    };
    

    async findOne(collectionName,id){
     const _id = new ObjectId(id);
     const client = getClient()
        try{
            await client.connect();
            const dbName = config.get('database.name')
            const database = client.db(dbName)
            const collection = database.collection(collectionName)
        /// Ejecutar comandos 
    
        const row = await collection.findOne({_id});
        return row
        
    
        }catch(error){
            console.error(error);
            throw{success:false,message:'Error Mongo service'}
        }
        finally{
            await client.close();
        }

    };

    async create(collectionName,payload){
        
        const client = getClient() // capturo el cliente
           try{
               await client.connect(); // se conecta
               const dbName = config.get('database.name') // se captura el nimbre d ela base de datos
               const database = client.db(dbName)
               const collection = database.collection(collectionName) //creo la conexion
           /// Ejecutar comandos 
       
           const row = await collection.insertOne(payload); // el insert se le pasa un documento que tiene toda la data llamdo payload
           return row
           
       
           }catch(error){
               console.error(error);
               throw{success:false,message:'Error Mongo service'}
           }
           finally{
               await client.close();
           }
   
       };

       async update(collectionName,payload, id){
        const _id = new ObjectId(id);
        const client = getClient() // capturo el cliente
           try{
               await client.connect(); // se conecta
               const dbName = config.get('database.name') // se captura el nimbre d ela base de datos
               const database = client.db(dbName)
               const collection = database.collection(collectionName) //creo la conexion
           /// Ejecutar comandos 
       
           const row = await collection.replaceOne({_id},payload); // el insert se le pasa un documento que tiene toda la data llamdo payload
           return row
           
       
           }catch(error){
               console.error(error);
               throw{success:false,message:'Error Mongo service'}
           }
           finally{
               await client.close();
           }
   
       };

    async delete(collection,id){
        const _id = new ObjectId(id);
        const client = getClient()
           try{
               await client.connect();
               const dbName = config.get('database.name')
               const database = client.db(dbName)
               const collection = database.collection(collectionName)
           /// Ejecutar comandos 
       
           const row = await collection.deleteOne({_id});
           return row
           
       
           }catch(error){
               console.error(error);
               throw{success:false,message:'Error Mongo service'}
           }
           finally{
               await client.close();
           }
   
       };
}
module.exports = {MongoService};
