const { detectarCodificacion } = require('./Utilerias/Codificacion/procesadorCodificacion')

const { recodificarArchivo }= require('./Utilerias/Codificacion/procesadorCodificacion')
/* Operadores de archivos */
const { leerCarpetaFiltrada } = require('./Utilerias/OperadoresArchivos/readDirOnlyFile')

const fs = require('fs')

const carpeta = 'Testing\\'
const carpetaReportes = 'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\Intelisis\\Intelisis5000\\Reportes MAVI'


/*** Procesar cambio de codificación ***/

// leerCarpetaFiltrada(carpeta, ['.vis','.frm','.esp','.tbl','.rep','.dlg'])
// .then(archivos => {

//     archivos.forEach(archivo =>  {
//         let content = new Buffer(recodificarArchivo(archivo, 'ASCII'),'ASCII')
//         fs.writeFileSync(archivo,
//             content.toString('ASCII')
//         )
//     })
    
// })

/*** Mostrar codificacion archivos ***/
// leerCarpetaFiltrada(carpeta, ['.vis','.frm','.esp','.tbl','.rep','.dlg'])
// .then(archivos => {

//     console.log('[\'.vis\',\'.frm\',\'.esp\',\'.tbl\',\'.rep\',\'.dlg\']')
//     archivos.forEach(x => console.log(
//         detectarCodificacion(x)
//         )
//     )
// })

/*** Archivos con codificacion diferente a 'ISO-8859-1' ***/
leerCarpetaFiltrada(carpetaReportes,  ['.vis','.frm','.esp','.tbl','.rep','.dlg'])
.then(archivos => {

    console.log('[\'.esp\']')

    archivos.forEach(x => (detectarCodificacion(x) != 'ISO-8859-1') && console.log(x) )
})
