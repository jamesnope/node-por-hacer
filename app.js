const colors = require('colors' , 'colors/safe');
const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
let comando = argv._[0];

switch ( comando ){
    case 'crear':
        console.log('Crear tarea');
        let tarea = porHacer.crear( argv.descripcion );
        console.log('Tarea creada: ' + tarea.descripcion );
        break;
    case 'listar':
        let lista = porHacer.getListado( argv.completado );
        for(let tarea of lista){
            console.log('====== Por Hacer ======'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ' + tarea.completado);
            console.log('======================='.green);
        }    

    break;
    case 'actualizar':
        console.log('Actualizar tarea por hacer');
        let actualizado = porHacer.actualizarTarea( argv.descripcion , argv.completado );
        if(actualizado){
            console.log('Se actualizo correctamente'.green);
        }
        else{
            console.log('No se actualizo el registro'.red);
        }
    break;
    case 'borrar':
        console.log('Inicio Borrar');
        let borrado = porHacer.borrarTarea( argv.descripcion );
        if(borrado){
            console.log('Se borro el registro correctamente'.green);
        }
        else{
            console.log('No se borro el registro'.red);
        }
    break;
    default:
        console.log('Comando no es reconocido');
}