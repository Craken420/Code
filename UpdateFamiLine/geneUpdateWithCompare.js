const sql = require("mssql")
const R = require('ramda')
const fs = require('fs')
const XLSX = require('xlsx')

const getExcelInObj = R.curry( (file, numSheet) => {
    let workbook = XLSX.readFile(file)
    let sheet_name_list = workbook.SheetNames
    if ( Array.isArray(numSheet) ) {
        return  R.map( sheet => {
                    return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[sheet]])
                }, numSheet ) 
    } else if ( typeof(numSheet) == 'number') {
        return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[numSheet]])    
    } else return null
});

const getObjToCompare = R.pipe(
    getExcelInObj, 
    R.map( R.omit([ 'GERENTE', '¿AUTORIZADO EL CAMBIO?']) )
)

const lineaActuAndNuevIsDiff = obj => {

    let lines = false;
    let families = false;

    if ( R.prop('LINEA ACTUAL', obj ) != R.prop('LINEA NUEVA', obj) )
    {
        lines = true;
    }

    if ( R.prop('FAMILIA ACTUAL', obj ) != R.prop('FAMILIA NUEVA', obj) )
    {
        families = true;
    }

    return { lines: lines, families: families }
}

const oppp = obj => {
    // Comparaciones
    const objsComp = getObjToCompare('UpdatesWithCompare.xlsx', 0)

    let lol =  R.filter( x => R.prop('FAMILIA NUEVA', x ) == R.prop('FAMILIA', obj), R.clone(objsComp) )
    lol =  R.filter( x => R.prop('LINEA NUEVA', x ) == R.prop('LINEA', obj), R.clone(lol) )
    let strUpdate = '';
    if (! R.isEmpty(lol) )
    {
        let singleObj = R.head(lol) 
        let result = lineaActuAndNuevIsDiff(singleObj)
     
        if (result['lines'] && result['families']) {
            strUpdate = 'UPDATE Art WITH(ROWLOCK)' + 
                             ' SET Familia = \'' + R.prop('FAMILIA', obj ) + '\',' +
                             ' Linea = \'' + R.prop('LINEA', obj ) + '\'' + 
                             ' WHERE Articulo = \'' + R.prop('CODIGO', obj ) +  '\''
        } else if (result['families']) {
            strUpdate = 'UPDATE Art WITH(ROWLOCK)' + 
                        ' SET Familia = \'' + R.prop('FAMILIA', obj ) + '\'' +
                        ' WHERE Articulo = \'' + R.prop('CODIGO', obj ) +  '\''
        } else if (result['lines']) {
            strUpdate = 'UPDATE Art WITH(ROWLOCK)' + 
                        ' SET Linea = \'' + R.prop('LINEA', obj ) + '\'' + 
                        ' WHERE Articulo = \'' + R.prop('CODIGO', obj ) +  '\'';
        }
    }
    if (strUpdate != '') {
        fs.appendFileSync('Report.txt', strUpdate + '\n', 'ascii')
        return strUpdate
    } else {
        fs.appendFileSync('Faltantes.txt', 
            'CODIGO:\'' + R.prop('CODIGO', obj ) + '; FAMILIA:\'' + R.prop('FAMILIA', obj ) +
            '; LINEA:\'' + R.prop('LINEA', obj ) + '\n', 
            'ascii')
        return 'Articulo = \'' + R.prop('CODIGO', obj )
    }
}

const opp = R.pipe(
    getExcelInObj,
    R.map(oppp)
)

console.log( 
    opp('UpdatesWithCompare.xlsx', 1) ) 


