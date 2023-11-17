const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors')

const app = express()


// Permite que el req contenga un json y este pueda ser leido en el back 
app.use(express.json());
// que metodos bloquea 
app.use(cors());

// esto nos permite acceder a las imagenes en el request 
//y puedo ponerle limitees , la direccion de la carpte temporal
app.use(fileUpload({tempFileDir:'./tmp'}));

// ambiente 
console.log(process.env)

// Importar router
// Aqui no es necesario poner la ruta hasta el archivo index porque es por defecto
const router = require('./src/routers');
const ConfigService = require('./src/services/ConfigService');
const config = new ConfigService();


// Establece una funcion que se va ejecutar cuando ingresen a la ruta
app.use(router);

const PORT = config.get('port')

app.listen(PORT,()=>{
    console.log(`api corriendo: http://localhost:${PORT}`);
})

// clase del 17 oct 35 minuto


// Del index a la ruta de la ruta al controllador y del controlador a los servicios