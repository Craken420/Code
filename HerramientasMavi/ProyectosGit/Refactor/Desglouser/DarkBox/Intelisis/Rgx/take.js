let { patt } = require('./patterns')
let { make } = require('./make')
const R = require('ramda')

/*
 Glosary:
    fld: field,
    cmp: component
    bfr: before
    Btwn: Between
    Abbrt: Abbreviate
*/

module.exports.take = {
    abbrtObjBtwnLowScripts: txt => (patt.abbrtObjBtwnLowScripts.test(txt)) ? txt.match(patt.abbrtObjBtwnLowScripts) : false,
    bfrAbbrtObj: txt => {
        if (patt.bfrAbbrtObj.test(txt)) {
            return txt.match(patt.bfrAbbrtObj)
        } else {
            return false
        }
    },
    cmpByName: (nameComp, txt) => {
        if (make.cmpByName(nameComp).test(txt)) {
            return txt.match(make.cmpByName(nameComp))
        } else {
            false
        }
    },
    cmpByNameFile: (nameComp, txt) => {
        if (make.cmpByNameFile(nameComp).test(txt)) {
            return txt.match(make.cmpByNameFile(nameComp))
        } else {
            false
        }
    },
    cmpHead: txt => (patt.cmpHead.test(txt.replace(/^/, '\n'))) ? txt.replace(/^/, '\n').match(patt.cmpHead) : false,
    cmpNameFile: txt => patt.cmpNameFile.test(txt) && txt.match(patt.cmpNameFile),
    cmpOutSide: (nameComp, txt) => {
        if (make.cmpOutSide(nameComp).test(txt)) {
            return txt.match(make.cmpOutSide(nameComp))
        } else {
            return false
        }
    },
    cmpAll: txt => {
        // console.log(patt.cmpAll)
        // console.log(txt)
        return (patt.cmpAll.test(txt)) ? txt.match(patt.cmpAll) : false
    },
    
    
    fldContnt: (field, txt) => {
        if (make.fldContnt(field).test(txt)) {
            return txt.match(make.fldContnt(field)).join('')
        }
    },
    fldFull: txt => (patt.fldFull.test(txt)) ? txt.match(patt.fldFull) : false,
    fldName: txt => (patt.fldName.test(txt)) ? txt.match(patt.fldName) : false,
    gerVar: text => {
        let variables = []
    
        if (/(?<=\bAsigna\b(\s+|)\().*?((?=\().*?\).*?|)*(?=\)((\s+|)<BR>|))/gi.test(text)) {
    
            text = text.match(/(?<=\bAsigna\b(\s+|)\().*?((?=\().*?\).*?|)*(?=\)((\s+|)<BR>|))/gi).join('\n')
    
            if (/(?<=^(\s+|))\w+([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+)(?=(\s+|),)|\b(mavi|dm\w+)([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+)/gim.test(text)) {
                variables.push(text.match(/(?<=^(\s+|))\w+([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+)(?=(\s+|),)|\b(mavi|dm\w+)([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+)/gim).join(','))
            }
        }
        if (variables.length != 0) {
            return variables.join(',')  + ','
        } else {
            return ''
        }
    },
    getDlg: text => {
        if (/(?<=\bDialogo\b(|\s+)\((|\s+)<t>(|\s+))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(|\s+)<t>(|\s+)\))/gi.test(text)) {
            return text.match(/(?<=\bDialogo\b(|\s+)\((|\s+)<t>(|\s+))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(|\s+)<t>(|\s+)\))/gi).join(',')  + ','
        } else {
            return ''
        }
    },
    getFormas: text => {
    
        let formas = []
        if (/(?<=\bOtraforma\b(\s+|)\((\s+|)<T>)[^]*?(?=<T>[^]*?\))/gi.test(text)) {
            text.match(/(?<=\bOtraforma\b(\s+|)\((\s+|)<T>)[^]*?(?=<T>[^]*?\))/gi).map(x => formas.push(x))
        }
    
        if (/(?<=\b(Actualizar|)Forma(|Modal)\b(\s+|)\((\s+|)<T>(\s+|))[^\s]*?(?=(\s+|)<T>(\s+|)\))/gi.test(text)) {
            text.match(/(?<=\b(Actualizar|)Forma(|Modal)\b(\s+|)\((\s+|)<T>(\s+|))[^\s]*?(?=(\s+|)<T>(\s+|)\))/gi).map(x => formas.push(x))
        }
        if (formas.length != 0) {
            return formas.join(',')  + ','
        } else {
            return ''
        }
    },
    getPlugIn: text => {
        if (/(?<=Ejecutar(\s+|)\((\s+|)<T>.*?\\(\s+|))\w+([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+|)(?=\.exe)/gi.test(text)) {
            return text.match(/(?<=Ejecutar(\s+|)\((\s+|)<T>.*?\\(\s+|))\w+([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+|)(?=\.exe)/gi).join(',') + ','
        } else {
            return ''
        }
    },
    getTbls: text => {
        if (/\w+tbl\b/gi.test(text)) {
           return text.match(/\w+tbl\b/gi).join(',') + ','
        } else {
            return ''
        }
    },
    getRep: text =>  {
        if (/(?<=<T>)\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(\s+|)\w+\.\d+\.\d+\.\d+(\s+|)<T>)|(?<=asigna(\s+|)\((\s+|)mavi\.reporte.*?<T>(\s+|))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(\s+|)<T>(\s+|)\))|(?<=\b(Reporte(Pantalla|Impresora))\b(|\((\s+|)reporte.*?)(|\s+)\((|\s+)<t>(|\s+))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(|\s+)<t>(|\s+)(\)|.*?\)))/gi.test(text)) {
            return text.match(/(?<=<T>)\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(\s+|)\w+\.\d+\.\d+\.\d+(\s+|)<T>)|(?<=asigna(\s+|)\((\s+|)mavi\.reporte.*?<T>(\s+|))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(\s+|)<T>(\s+|)\))|(?<=\b(Reporte(Pantalla|Impresora))\b(|\((\s+|)reporte.*?)(|\s+)\((|\s+)<t>(|\s+))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(|\s+)<t>(|\s+)(\)|.*?\)))/gi).join(',') + ','
        }  else {
            return ''
        }
    },
    getVista: text => {
        let vis = []
        if (/(?<=ActualizarVista(|\s+)\((|\s+)<T>(|\s+))[^\s]*?(?=(|\s+)<T>(|\s+)\))/gi.test(text)) {
            text.match(/(?<=ActualizarVista(|\s+)\((|\s+)<T>(|\s+))[^\s]*?(?=(|\s+)<T>(|\s+)\))/gi).map(x => vis.push(x))
        }
        if (/\w+vis\b(?=:\w+)|\w+vis\b/g.test(text)) {
            text.match(/\w+(?=:\w+)|\w+vis\b/g).map(x => vis.push(x))
        }
        if (vis.length != 0) {
            return vis.join(',') + ','
        }  else {
            return ''
        }
    }
}
