// Es para estandarizar si en el futuro se tienen mas servicios
class IDatabase{
    findAll(collectionName){
        throw 'Implementar metodo'
    }
    findOne(collectionName,id){
        throw "implementar metodo"
    }
    create(collectionName,payload){
        throw "implementar el metodo"
    }
    update(collectionName,payload,id){
        throw "implementar el metodo"
    }
    delete(collectionName,id){
        throw "implementar el metodo"
    }

}

module.exports = {IDatabase};