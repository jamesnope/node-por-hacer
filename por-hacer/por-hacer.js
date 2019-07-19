const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, ( err ) => {
        if ( err ) throw new Error( 'No se pudo guardar', err );
    });
};

const cargarDB = () => {
    try{
        listadoPorHacer = require('../db/data.json');
    }
    catch(error){
        listadoPorHacer = [];
    }
}

const crear = ( descripcion ) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: "false"
    };
    // Adiciono el objeto a la lista con el .push
    listadoPorHacer.push(porHacer);

    // Guardar en el json
    guardarDB();
    // Retorno el objeto creado
    return porHacer;
};

const getListado = ( completado ) => {
    cargarDB();
    // console.log(listadoPorHacer);
    let result = listadoPorHacer.filter( tarea => tarea.completado === completado );
    // console.log(result);
    return result;
};

const actualizarTarea = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion );
    if(index >= 0){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    else{
        return false;
    }
};

const borrarTarea = ( descripcion ) => {
    cargarDB();
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion );
    if(index >= 0) {
        listadoPorHacer.splice(index,1);
        guardarDB();
        return true;
    }
    else{
        return false;
    }
};

module.exports = {
    crear,
    getListado,
    actualizarTarea,
    borrarTarea
}