const fs = require('fs')
const path = require('path')
const R = require('ramda')

const { DrkBx } = require('./DarkBox/index')

const rootData = 'Testing\\'

const cnctRootEsp = R.map(file => rootData + file)

/*
    [
        'ListaCampos.Cambios',
        'ListaParametros1'
    ]
*/

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

const retObj = txt => {
   return DrkBx.mix.fnObj.delDeepEmpty({ Intls: DrkBx.mix.fnObj.delDeepEmpty(getObjsIntls(txt)),
    sql: DrkBx.mix.fnObj.delDeepEmpty(getObjsSQL(txt))})
}

const getObj = R.pipe(
    DrkBx.mix.fls.gtLtnTxt,
    DrkBx.intls.fnObj.toObj,
    DrkBx.intls.fnObj.clsContinua,
)

const getInField = R.pipe(
    R.map(R.pick([
        'ActivoCondicion',
        'AlCambiar',
        'AntesExpresiones',
        'AyudaOpcionesArticulo',
        'CondicionDespliege',
        'CondicionEdicion',
        'CondicionVisible',
        'EjecucionCondicion',
        'Expresion',
        'ExpresionesAntes',
        'ExpAntesRefrescar',
        'ExpresionesAlCerrar',
        'ExpresionesAlMostrar',
        'FiltroGeneral',
        'FiltroAbierto',
        'Formula',
        'FormulaSQL',
        'SQL',
        'SQL.Cambios',
        'Totalizadores',
        'Totalizadores1',
        'Totalizadores2',
        'Totalizadores3',
        'ValidacionCondicion',
        'ValorPorOmision',
        'ValorRefrescar',
        'VisibleCondicion',
    ])),
    R.map(R.map(retObj)),
    R.mergeAll,
    R.map(DrkBx.mix.fnObj.delDeepEmpty),
    DrkBx.mix.fnObj.delDeepEmpty
)

const creatEtx = obj => {
    if (R.has('TipoAccion', obj)){
        if ( /Reporte/gi.test( R.prop( 'TipoAccion', obj ) ) ) {
            return  R.objOf( 'ClaveAccion', R.objOf( 'Intls', { rep: R.prop('ClaveAccion', obj) + '.rep,'}))
        } else if ( /\bVista\b/gi.test(R.prop('TipoAccion', obj) ) ) {
            return  R.objOf('ClaveAccion', R.objOf('Intls', { vis: R.prop('ClaveAccion', obj) + '.vis,'}))
        } else if ( /\bForma\b/gi.test(R.prop('TipoAccion', obj) ) ) {
            return R.objOf('ClaveAccion', R.objOf('Intls', { frm: R.prop('ClaveAccion', obj) + '.frm,'}))
        } else if ( /\bDialogo\b/gi.test(R.prop('TipoAccion', obj) ) ) {
            return R.objOf( 'ClaveAccion', R.objOf('Intls', { dlg: R.prop('ClaveAccion', obj) + '.dlg,'} ) )
        } else if ( /\bTabla\b/gi.test( R.prop('TipoAccion', obj) ) ) {
            return R.objOf( 'ClaveAccion', R.objOf('Intls', { tbl: R.prop('ClaveAccion', obj) + '.tbl,'} ) )
        } else {
            return ''
        }
    } else {
        return ''
    }
}

const getVisInFld = R.pipe(
    R.map(R.pick( [
        'AyudaVista',
        'Vista'
    ])),
    R.map( R.reject( R.test(/\(variables\)/gi) ) ),
    R.map( R.map( x => R.objOf('Intls', R.objOf('vis', x + ',') ) ) ),
    DrkBx.mix.fnObj.delDeepEmpty,
)

const getFrmInFld = R.pipe(
    R.map( R.pick([
        'AyudaForma',
        'FormaPrevia'
    ]) ),
    R.map( R.map( x => R.objOf('Intls', R.objOf('frm',  x + ',') ) ) ),
    DrkBx.mix.fnObj.delDeepEmpty,
)

const getAccion = R.pipe(
    R.map(creatEtx),
    DrkBx.mix.fnObj.delDeepEmpty
)

const getObjsFlds = pathFile => {
    return {
        [DrkBx.mix.cls.pthRoot(pathFile)]: R.mergeDeepWith(R.concat,
            getInField(getObj(pathFile)),
            R.mergeDeepWith(R.concat,
                R.mergeDeepWith(R.concat,
                    getAccion( getObj(pathFile) ),
                    getVisInFld( getObj(pathFile) )
                ),
                getFrmInFld(getObj(pathFile))
            )
        )
    }
}

const getResumenInArray = obj => {
    let array = []
    for (key in obj) {
        for (key2 in obj[key]) {
            for (key3 in obj[key][key2]) {
                for (key4 in obj[key][key2][key3]) {
                    array.push(obj[key][key2][key3][key4])
                }
            }
        }
    }
    return array
}

const mergeResumen = obj => {
    let objs = {}
    R.mapObjIndexed((val, key, obj) => {
        return objs = R.mergeDeepWith(R.concat, objs, obj[key])
    }, obj)
    return objs
}


const putPathExt = obj => {
    if (R.hasPath(['Intls','frm'], obj)) {
        obj['Intls']['frm'] = R.map(
            (x => x.replace(/$/, '.frm')), 
            obj['Intls']['frm'].split(',').filter(Boolean)).join(',')
    }

    if (R.hasPath(['Intls','vis'], obj)) {
        obj['Intls']['vis'] = R.map(
            (x => x.replace(/$/, '.vis')), 
            obj['Intls']['vis'].split(',').filter(Boolean)).join(',')
    }

    if (R.hasPath(['Intls','tbl'], obj)){
        obj['Intls']['tbl'] = R.map(
            (x => x.replace(/$/, '.tbl')), 
            obj['Intls']['tbl'].split(',').filter(Boolean)).join(',')
    }
    return obj
}

const ls = R.pipe(
    R.split(','),
    R.map(x => DrkBx.intls.fnCmp.getCmpsByName(x, ))
)

const fns = obj => {
    if (R.hasPath(['Intls','variables'], obj)) {
        ls(obj['Intls']['variables'])
    }
}

const getRelation = R.pipe(
    R.map(getObjsFlds),
    getResumenInArray,
    mergeResumen,
    putPathExt,
    fns
)

console.log(getRelation(DrkBx.mix.fls.getFiltFls(['.esp','.frm', '.rep'], rootData)))
