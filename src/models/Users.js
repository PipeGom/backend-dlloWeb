// Almacena la interacion con la base de datos 

class User {

    // ponemos todos los atributos que posee la tarea 
    // el parametro de entrada es un objeto que se va destructurar
    constructor({id,name,email,password,credential}){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.credential= credential;
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
        if(!this.email || this.email?.toString().length ==0 )
        {
            throw {status: 400, message:'El email es obligatorio'}
        }
        if(!this.password || this.password?.toString().length ==0 )
        {
            throw {status: 400, message:'La clave es obligatorio'}
        }
        if(!this.credential || this.credential?.toString().length ==0 )
        {
            throw {status: 400, message:'La credencial es obligatorio'}
        }
    }
    
    // este es un metodo para devolver los atributos de un tarea en un json
    toJson(){
        return {
        "id":this.id,
        "name":this.name, 
        "email" :this.email,
        "password":this.password,
        "credential":this.credential,
        };
    }

    // Clase de 5 octubre min 43:05 
}
module.exports = User