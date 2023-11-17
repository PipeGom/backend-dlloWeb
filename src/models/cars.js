class Car{

    constructor(nombre, cedula, numero,  correo, direccion, modelo, marca, placa, descripcion){
        this.nombre = nombre;
        this.cedula = cedula;
        this.numero = numero;
        this.correo = correo;
        this.direccion = direccion;
        this.modelo = modelo;
        this.marca = marca;
        this.placa = placa;
        this.descripcion = descripcion
    }

    valid(){
    //     if (!this.id || this.id?.toString().length == 0 ) {  
    //         throw {status:400, message:'El id  es obligatorio'};
    // }
        if (!this.nombre || this.nombre?.toString().length == 0 ) {  
            throw {status:400, message:'El name  es obligatorio'};
    }
    }
    

    toJson(){
        return { 
            "nombre": this.nombre,
            "cedula": this.cedula,
            "numero": this.numero,
            "correo": this.correo,
            "direccion": this.direccion,
            "modelo": this.modelo,
            "marca": this.marca,
            "placa": this.placa,
            "descripcion": this.descripcion
        };
    }
}

module.exports = Car