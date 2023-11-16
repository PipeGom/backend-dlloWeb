// Aqui se va hacer la conexion a la base de datos Mongo

const {MongoClient}=require('mongodb')
const {IDatabase}=require('./AdapterDatabase')

// Retorna el cliente para conectarnos al mongo
const getClient = () => {

    //la uri se separa porque normalmente se tienen varios ambientes por lo tanto estos datos pueden cambiar
    //
    const user = 'luisfelipegogi44'
    const password = 'Hola1234'
    const host = 'taller.kd6pcvu.mongodb.net'

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

// conexion del cliente a la base de datos
const executeQuery = async() => {
    try{

        const client = getClient() // se captura el cliente 
        await client.connect();  // Nos conectamos 

        // Ejecutar Comandos de insercion, actualizacion etc.

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    }catch(error){
        // Aqui se capturan os posibles errores

    }
    finally{
        // siempre se debe cerrar la conexion como buena practica
        await client.close();
    }
}

// la clase de mongo service va implementar La interfaz de
class MongoService extends IDatabase{

    // va retornar el execute query de mongo service 
    executeQuery(){
        return executeQuery()
    }

}

// podemos exportar solo la funcion executeQuery
module.exports = {
    MongoService
}

