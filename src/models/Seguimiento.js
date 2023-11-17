class Seguimiento{

    constructor(id, id_auto, precio_reparacion, horas_reparacion){
        this.id = id;
        this.id_auto = id_auto;
        this.precio_reparacion = precio_reparacion;
        this.horas_reparacion = horas_reparacion;
    }

    valid(){
        if (!this.precio_reparacion || this.precio_reparacion?.toString().length == 0 ) {  
            throw {status:400, message:'Ingrese el precio de reparacion'};
    }
        if (!this.horas_reparacion || this.horas_reparacion?.toString().length == 0 ) {  
            throw {status:400, message:'Ingrese las horas de reparacion'};
    }
}
    toJson(){
        return { 
            "id": this.id,
            "id_auto": this.id_auto,
            "precio_reparacion": this.precio_reparacion,
            "horas_reparacion": this.horas_reparacion
        };
    }
}

module.exports = Seguimiento