const fs = require('fs')
const path = require('path')
const R = require('ramda')

const { DrkBx } = require('./DarkBox/index')

const rootData = 'Testing\\'

const cnctRootEsp = R.map(file => rootData + file)

function getObjsSQL(txt) {
    return {
        fn : DrkBx.sql.take.getFunctionsSQL(DrkBx.sql.take.getClauseSQL(txt)),
        sp : DrkBx.sql.take.getSPSQL(DrkBx.sql.take.getClauseSQL(txt)),
        tb : DrkBx.sql.take.getTablesSQL(DrkBx.sql.take.getClauseSQL(txt))
    }
}

function getObjsIntls(txt) {
    return {
        dlg: DrkBx.intls.take.getDlg(txt),
        frm: DrkBx.intls.take.getFormas(txt),
        plugin: DrkBx.intls.take.getPlugIn(txt),
        rep: DrkBx.intls.take.getRep(txt),
        tbl: DrkBx.intls.take.getTbls(txt),
        vis: DrkBx.intls.take.getVista(txt),
        variables: DrkBx.intls.take.gerVar(txt)
    }
}

const isValid = n =>{
    return (n == undefined || n == false ||  n == '')
}

const fns = obj => {
    for (key in obj) {
        if (typeof(obj[key]) != 'object') {
            return R.reject(isValid, obj)
        } else {
            return fns(obj[key])
        }
    }
}

const retObj = txt => {
   return DrkBx.mix.fnObj.delDeepEmpty({ Intls: DrkBx.mix.fnObj.delDeepEmpty(getObjsIntls(txt)),
    sql: DrkBx.mix.fnObj.delDeepEmpty(getObjsSQL(txt))})
}

const getObj = R.pipe(
    DrkBx.mix.fls.gtLtnTxt,
    DrkBx.intls.fnObj.toObj,
    DrkBx.intls.fnObj.clsContinua,
    R.map(R.pick([
        'ActivoCondicion',
        'AlCambiar',
        'AntesExpresiones',
        'AyudaExpresionesForma',
        'AyudaForma',
        'AyudaOpcionesArticulo',
        'AyudaVista',
        'TipoAccion',
        'ClaveAccion',
        'Comentarios',
        'CondicionDespliege',
        'CondicionEdicion',
        'CondicionVisible',
        'EjecucionCondicion',
        'Expresion',
        'Expresiones',
        'ExpresionesAntes',
        'ExpAntesRefrescar',
        'ExpresionesAlCerrar',
        'ExpresionesAlMostrar',
        'FiltroGeneral',
        'FiltroAbierto',
        'FormaPreiva',
        'Formula',
        'FormulaSQL',
        'ListaParametros1',
        'Singular',
        'SQL',
        'SQL.Cambios',
        'Totalizadores',
        'Totalizadores1',
        'ValidacionCondicion',
        'ValidacionMensajeError',
        'ValorPorOmision',
        'ValorRefrescar',
        'Visible',
        'VisibleCondicion',
        'Vista'
    ])),
    R.map(R.map(retObj)),
    R.mergeAll,
    R.map(DrkBx.mix.fnObj.delDeepEmpty),
    DrkBx.mix.fnObj.delDeepEmpty
)

const asigPath = pathFile => {
    return {[pathFile]: getObj(pathFile)}
}
let record = R.pipe(
    R.map(asigPath)
)

let obj = record(DrkBx.mix.fls.getFiltFls(['.esp','.frm', '.rep'], rootData))

for (key in obj) {
    for (key2 in obj[key]) {
        for (key3 in obj[key][key2]) {
            for (key4 in obj[key][key2][key3]) {
                for (key5 in obj[key][key2][key3][key4]) {
                    console.log(obj[key][key2][key3][key4][key5])
                }
            }
        }
    }
}

// for (key in obj) {
//     for (key2 in obj[key]) {
//         for (key3 in obj[key][key2]) {
//             for (key4 in obj[key][key2][key3]) {
//                 console.log(obj[key][key2][key3][key4])
//             }
//         }
//     }
// }

// for (key in obj) {
//     for (key2 in obj[key]) {
//         for (key3 in obj[key][key2]) {
//             console.log(obj[key][key2][key3])
//         }
//     }
// }

// for (key in obj) {
//     for (key2 in obj[key]) {
//         console.log(obj[key][key2])
//     }
// }

// for (key in obj) {

//     console.log(obj[key])

// }

// console.log(obj)
