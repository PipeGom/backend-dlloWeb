// Almacena la interacion con la base de datos 

class Task {

    // ponemos todos los atributos que posee la tarea 
    constructor(id,name,description){
        this.id = id;
        this.name = name;
        this.description = description;
    }

    // el ? se usa para que en caso de que la variable sea undefined no reviente la app
    valid(){
        if(!this.id || this.id?.toString().length ==0 )
        {
            throw {status: 400, message:'El id es obligatorio'}
        }
        if(!this.name || this.name?.toString().length ==0 )
        {
            throw {status: 400, message:'El nombre es obligatorio'}
        }
    }
    
    // este es un metodo para devolver los atributos de un tarea en un json
    toJson(){
        return {
        "id":this.id,
        "name":this.name, 
        "description" :this.description,
        };
    }

    // Clase de 5 octubre min 43:05 
}
module.exports = Task