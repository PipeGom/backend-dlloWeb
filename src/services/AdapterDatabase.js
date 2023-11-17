// Este archivo sirve de interfaz para que independiente del servicio se pueda utiliar las operaciones definidas 
//O sea que no importara si se cambia de base de datos
// En resumen nos permite estandarizar los servicios que sean agregados al proyecto 
class IDatabase{

    findAll(collectionName){
        throw 'implementar metodo'
    }
    findOne(collectionName,id){
        throw "implementar metodo"
    }
    create(collectionName,payload){
        throw "implementar metodo"
    }
    update(collectionName,payload,id){
        throw "implementar metodo"
    }
    delete(collectionName,payload,id){
        throw "implementar metodo"
    }
    findByFilter(collectionName,filter){
        throw "Implementar metodo"
    }
}

// exportamos la clase Mongo Service
module.exports = {IDatabase}