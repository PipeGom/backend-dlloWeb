// Este archivo sirve de interfaz para que independiente del servicio se pueda utiliar las operaciones definidas 
//O sea que no importara si se cambia de base de datos
// En resumen nos permite estandarizar los servicios que sean agregados al proyecto 
class IDatabase{

    executeQuery(){
        throw 'implementar metodo'
    }

}

// exportamos la clase Mongo Service
module.exports = {IDatabase}