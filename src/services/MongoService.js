// Aqui se va hacer la conexion a la base de datos Mongo

const {MongoClient,ServerApiVersion,ObjectId}=require('mongodb')
const {IDatabase}=require('./AdapterDatabase')
 const ConfigService = require('./ConfigService')


// se usara para saber el nombre del ambiente

const config= new ConfigService();

// Retorna el cliente para conectarnos al mongo
const getClient = () => {

    //la uri se separa porque normalmente se tienen varios ambientes por lo tanto estos datos pueden cambiar
    // Va coger los datos del json en configuracion
    const user =  config.get('database.user')
    const password = config.get('database.password')
    const host = config.get('database.host')

    // Se pone en template string `` para poder meter variables 
    const uri = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`;

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      // Con el cliente creado vamos a conectarnos y crear las acciones
      return client;
}



// la clase de mongo service va implementar La interfaz de
class MongoService extends IDatabase{

    constructor(){
        super();
        console.log('Mongo Service')
        // siempre se debe llamar super que hereda los atributos de la clase padre
        
    }
    // va retornar el execute query de mongo service 
    // conexion del cliente a la base de datos
    async findAll(collectionName){
        // se debe declara client fuera del bloque para que pueda usarse en el bloque finally
    const client = getClient() // se captura el cliente

    try{

        
        await client.connect();  // Nos conectamos 

        // se saca el nombre de la base de datos del archivo config
        const dbName = config.get('database.name')
        // obtenemos la base de datos
        const database = client.db(dbName)
        console.log(database)
        // Obtenemos la collection a traves de el database 
        const collection = database.collection(collectionName)

        // Ejecutar Comandos de insercion, actualizacion etc.

        //retorna todos los elementos, en un array para manejarlos mejor
        const rows = await collection.find().toArray();
        console.log(rows)

        // se retorna rows por que contiene un array con los datos en la base de datos 
        // y se necesitan en el archivo del controlador
        return rows

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    }catch(error){
        // Aqui se capturan os posibles errores
        console.error(error)
        throw {success:false,message:'Error Mongo service'}

    }
    finally{
        // siempre se debe cerrar la conexion como buena practica
        await client.close();
    }
    }
    async findOne(collectionName, id){
        const _id = new ObjectId(id);
        const client = getClient() // se captura el cliente
    try{        
        await client.connect();  // Nos conectamos 
        const dbName = config.get('database.name')
        const database = client.db(dbName)
        console.log(database)
        const collection = database.collection(collectionName)
        // Ejecutar Comandos de insercion, actualizacion etc.
        // se le pasa un filtro en un json se puede fintrar por cualquier campo que tenga en mongo
        const rows = await collection.findOne({_id});
        console.log(rows)
        return rows
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }catch(error){
        console.error(error)
        throw {success:false,message:'Error Mongo service'}
    }
    finally{
        await client.close();
    }
    }

    async findByFilter(collectionName, filter){
       
        const client = getClient() // se captura el cliente
    try{        
        await client.connect();  // Nos conectamos 
        const dbName = config.get('database.name')
        const database = client.db(dbName)
        console.log(database)
        const collection = database.collection(collectionName)
        // Ejecutar Comandos de insercion, actualizacion etc.
        // se le pasa un filtro en un json se puede fintrar por cualquier campo que tenga en mongo
        const rows = await collection.findOne(filter);
        console.log(rows)
        return rows
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }catch(error){
        console.error(error)
        throw {success:false,message:'Error Mongo service'}
    }
    finally{
        await client.close();
    }
    }
    // para crear solo necesito el nombre de la collection donde se va guardar
    // y la data con la que se va crear que es el payload
    /**
     * 
     * @param {string} collectionName 
     * @param {Object} payload 
     * @returns 
     */
    async create(collectionName,payload){
       
        const client = getClient() // se captura el cliente
    try{        
        await client.connect();  // Nos conectamos 
        const dbName = config.get('database.name')
        const database = client.db(dbName)
        console.log(database)
        const collection = database.collection(collectionName)
        // Ejecutar Comandos de insercion, actualizacion etc.
        // se le pasa el archivojson que contiene todos los datos de la tarea en payload
        const rows = await collection.insertOne(payload);
        console.log(rows)
        return rows
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }catch(error){
        console.error(error)
        throw {success:false,message:'Error Mongo service'}
    }
    finally{
        await client.close();
    }
    }
    async delete(collectionName, id){
        const _id = new ObjectId(id);
        const client = getClient() // se captura el cliente
    try{        
        await client.connect();  // Nos conectamos 
        const dbName = config.get('database.name')
        const database = client.db(dbName)
        console.log(database)
        const collection = database.collection(collectionName)
        // Ejecutar Comandos de insercion, actualizacion etc.
        // se le pasa un filtro en un json se puede fintrar por cualquier campo que tenga en mongo
        // el many sirve para borrar muchos objetos de una categoria 
        // se le pasa un filtro
        const rows = await collection.deleteOne({_id});
        console.log(rows)
        return rows
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }catch(error){
        console.error(error)
        throw {success:false,message:'Error Mongo service'}
    }
    finally{
        await client.close();
    }
    }
    async update(collectionName,payload,id){

        const _id = new ObjectId(id);
       
        const client = getClient() // se captura el cliente
    try{        
        await client.connect();  // Nos conectamos 
        const dbName = config.get('database.name')
        const database = client.db(dbName)
        console.log(database)
        const collection = database.collection(collectionName)
        // Ejecutar Comandos de insercion, actualizacion etc.
        // se le pasa el archivojson que contiene todos los datos de la tarea en payload
        // con el payload que contiene la informacion actualizar
        // update one es para modificar por propiedades mirar documentacion
        // replace one es para remplazar todo 
        const row = await collection.replaceOne({_id},payload);
        console.log(row)
        return row
        
    }catch(error){
        console.error(error)
        throw {success:false,message:'Error Mongo service'}
    }
    finally{
        await client.close();
    }
    }

   

}

// podemos exportar solo la funcion executeQuery
module.exports = {
    MongoService
}

