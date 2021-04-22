const fs = require('fs')
const { detectarCodificacion } = require('./Utilerias/Codificacion/procesadorCodificacion')
const { leerCarpetaFiltrada } = require('./Utilerias/OperadoresArchivos/readDirOnlyFile')
const { recodificarArchivo }= require('./Utilerias/Codificacion/procesadorCodificacion')

//const carpeta = 'Testing\\'
const carpetaOriginal5000 = 'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\NewIntelisis\\Intelisis5000\\Codigo Original\\'
const carpetaReportes3000 = 'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\NewIntelisis\\Intelisis3100\\Reportes MAVI\\'
const carpetaOriginal3000 = 'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\NewIntelisis\\Intelisis3100\\Codigo Original\\'
const ruta = './codificacion/'

const arrCode = ['ISO-8859-1', 'ISO-8859-9']

function omitCode (carpetaOriginal3000, arrCode) {
    leerCarpetaFiltrada(carpetaOriginal3000, ['.vis','.frm','.esp','.tbl','.rep','.dlg'])
    .then(archivos => {
        archivos.forEach(x => {
            let condicion = arrCode.join('& detectarCodificacion(x) != \'').replace(/\&/g, '\' && ').replace(/^/gm, 'detectarCodificacion(x) != \'').replace(/$/, '\'')
            if (eval(condicion)) {
                console.log(x.replace(/.*\\/g, ''))
                console.log(detectarCodificacion(x))
            }
        })
    })
}

function wishCode (carpetaOriginal3000, arrCode) {

    leerCarpetaFiltrada(carpetaOriginal3000, ['.vis','.frm','.esp','.tbl','.rep','.dlg'])
    .then(archivos => {
        
        archivos.forEach(x => {
            let condicion = arrCode.join('& detectarCodificacion(x) != \'').replace(/\&/g, '\' && ').replace(/^/gm, 'detectarCodificacion(x) != \'').replace(/$/, '\'')
            //console.log(eval(condicion))
            if (!eval(condicion)) {
                console.log(x.replace(/.*\\/g, ''))
                console.log(detectarCodificacion(x))
            }
        })
    })
}

function cambiarCodificacionMulti (carpeta, arrExtensiones, codificacion) {

    leerCarpetaFiltrada(carpeta, arrExtensiones)
    .then(archivos => {

        archivos.forEach(archivo =>  {
            let content = new Buffer(recodificarArchivo(archivo, codificacion),codificacion)
            console.log(detectarCodificacion(archivo))
            console.log(ruta + 'test/' + archivo.replace(/.*\\/g, ''))
            fs.writeFileSync(ruta + 'test/' + archivo.replace(/.*\\/g, ''),
                content.toString(codificacion)
            )
            console.log(detectarCodificacion(ruta + 'test/' + archivo.replace(/.*\\/g, '')))
        })
    })
}

function cambiarCodificacionMono (file, codificacion) {

    console.log(detectarCodificacion(file))

    let content = new Buffer(recodificarArchivo(file, codificacion),codificacion)

    fs.writeFileSync(file,
        content.toString(codificacion)
    )

    console.log(detectarCodificacion(file))

}

// cambiarCodificacionMulti(carpeta, ['.vis','.frm','.esp','.tbl','.rep','.dlg'], 'ASCII')

// omitCode (carpetaOriginal3000, arrCode)
wishCode(carpetaOriginal3000, arrCode)
// cambiarCodificacionMono(ruta, ['.esp','.tbl','.dlg'], 'utf8')


function btw () {
    
var ruta = 'C:/cadiaz/mavi/intelisis/5000Capacitacion/Reportes MAVI/'
var files = listarArchivos(ruta)
var arr = []


files.forEach(file => {
	let cod = detectarCodificacion(ruta + file)
	if(cod !== 'Latin1'){
		let cont = fs.readFileSync(ruta + file, cod)
		fs.writeFileSync(ruta + file, cont, {encoding:'latin1'})
		arr.push(file)
	}

})
fs.appendFileSync('test.txt', arr)
}