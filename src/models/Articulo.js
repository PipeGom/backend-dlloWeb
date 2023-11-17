class Articulo{

    constructor(id, nombre, descripcion, cantidad, precio, imagen){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.precio = precio;
        this.imagen = imagen;
    }

    valid(){
        if (!this.id || this.id?.toString().length == 0 ) 
            throw {status:400, message:'El id  es obligatorio'
    
    }
    }
    

    toJson(){
        return { 
            "id": this.id,
            "nombre": this.nombre,
            "descripcion": this.descripcion,
            "cantidad": this.cantidad,
            "precio": this.precio,
            "imagen": this.imagen
        };
    }
}

module.exports = Articulo