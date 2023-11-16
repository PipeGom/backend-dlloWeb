const express = require('express')

const app = express()

// Permite que el req contenga un json y este pueda ser leido en el back 
app.use(express.json());

// Importar router
// Aqui no es necesario poner la ruta hasta el archivo index porque es por defecto
const router = require('./src/routers')

// Establece una funcion que se va ejecutar cuando ingresen a la ruta
app.use(router)

app.listen(3000,()=>{
    console.log('api corriendo: http://localhost:3000 ');
})