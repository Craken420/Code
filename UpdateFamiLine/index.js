const sql = require("mssql")
const R = require('ramda')
const fs = require('fs')
const XLSX = require('xlsx')

const config = {
    user: 'lapena',
    password: 'Mavi5000',
    server: 'PROSERVER',
    database: 'IntelisisTmp'
}

const exeSelectAndReport = (oldFami, newFami, oldLine, newLine) => {

    let strUpdateStart = 'UPDATE Art WITH(ROWLOCK)\n' + 
                         'SET Familia = \'' + newFami + ',\n' +
                         '    Linea   = \'' + newLine + '\'\n' + 
                         'WHERE Articulo = \'';

    let strUpdateEnd = '\'\n' + 
                       'AND Familia = \'' + oldFami + '\'\n' +
                       'AND Linea = \'' + oldLine + '\'\n';
                       
    let strSelect = ' SELECT Articulo FROM Art WITH (NOLOCK)' + 
                    ' WHERE Familia = \'' + oldFami + '\'' +
                    ' AND Linea = \'' + oldLine + '\'' +
                    ' AND Estatus IN (\'ALTA\', \'BLOQUEADO\') '
    
    sql.connect(config, (err) => {
        if (err) {
            result = false 
            console.log('err con')  
        }

        let cmdSQL = new sql.Request();

        cmdSQL.query(strSelect,
            function(err, rows) {
                if(err) {
                    console.log(err);
                    result = false
                    console.log('err query: ', strSelect)
                    return false
                } else {
                    fs.appendFileSync(
                        'Reporte.txt', 
                        R.join(
                            '\n\n',
                            R.map( 
                                R.pipe( 
                                    R.prop('Articulo'),
                                    R.replace(/^/gm, strUpdateStart),
                                    R.replace(/(?<=WHERE.*?)$/gm, strUpdateEnd)
                            ), rows.recordset) 
                        ),
                        'utf8'
                    )
                    result = true
                }
            }
        )
        
    })
    return strSelect;
};

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

const getReportUpdates = R.pipe(
    R.filter(x => R.prop('¿AUTORIZADO EL CAMBIO?', x) == 'SI' ),
    R.map( R.pipe(R.dissoc('GERENTE'), R.dissoc('¿AUTORIZADO EL CAMBIO?') ) ),
    R.map(x => exeSelectAndReport(
            R.prop('FAMILIA ACTUAL', x),
            R.prop('FAMILIA NUEVA', x),
            R.prop('LINEA ACTUAL', x),
            R.prop('LINEA NUEVA', x)
        )   
    )
);

//console.log( 
    getReportUpdates( getExcelInObj('AUTORIZACION DE CREACION DE FAMILIAS-LINEAS.xlsx', 0) )
///)
