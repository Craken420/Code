const { detectarCodificacion } = require('./Utilerias/Codificacion/procesadorCodificacion')
const { recodificarArchivo }= require('./Utilerias/Codificacion/procesadorCodificacion')
const fs = require('fs')

const carpeta = 'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\Intelisis\\SQL5000'

let array = [
    'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\Intelisis\\SQL5000\\dbo.ServicioTipo.Table.sql',
    'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\Intelisis\\SQL5000\\dbo.spALTER_TABLE.StoredProcedure.sql',
    'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\Intelisis\\SQL5000\\dbo.spDROP_TABLE.StoredProcedure.sql',
    'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\Intelisis\\SQL5000\\dbo.spRENAME_TABLE.StoredProcedure.sql'
]

array.forEach(x => console.log(
                    (detectarCodificacion(x))
                    )
                )

array.forEach(archivo =>  {
            let content = new Buffer(recodificarArchivo(archivo, 'utf-16le'),'utf-16le')
            fs.writeFileSync(archivo,
                content.toString('utf-16le')
            )
        })



/*** Archivos con codificacion diferente a 'UTF16-LE' ***/

// leerCarpetaFiltrada(carpeta, ['.sql'])
// .then(archivos => {

//     console.log('[\'.sql\']')

//     archivos.forEach(x => (detectarCodificacion(x) != 'UTF-16LE') && console.log(x) )
// })



/*** Procesar cambio de codificación ***/

// leerCarpetaFiltrada(carpeta, ['.sql'])
// .then(archivos => {
    
//     archivos.forEach(archivo =>  {
//         let content = new Buffer(recodificarArchivo(archivo, 'utf32le'),'utf32le')
//         fs.writeFileSync(archivo,
//             content.toString('utf32le')
//         )
//     })
    
// })



/*** Mostrar archivos ***/
// leerCarpetaFiltrada(carpeta, ['.sql'])
// .then(archivos => {

//     console.log('[\'.sql\']')

//     archivos.forEach(x => console.log(
//                 (detectarCodificacion(x))
//                 )
//             )
// })

