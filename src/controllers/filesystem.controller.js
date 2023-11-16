// Aqui se busca escribir o leer los datos en un archivo usando el modulo fs de node js

const {readFileSync, writeFileSync, appendFileSync} = require('fs');


// Antes teniamos el write file pero este sobre escribia sobre lo que ya habia en el json 
// Ahora con el appendFileSync vamos agregando cada vez que se llama el metodo
const saveData = (path,data) => { 

   const currentData = getData(path)
   currentData.push(data);
   console.log(currentData);
   writeFileSync(path, JSON.stringify(currentData));
 }

 const getData = (path) => { 
    const stringInfo = readFileSync(path);
    return JSON.parse(stringInfo);
    
 };

 module.exports = {
    saveData,
    getData
 }