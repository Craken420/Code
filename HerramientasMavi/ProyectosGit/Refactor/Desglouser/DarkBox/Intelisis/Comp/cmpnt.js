const R = require('ramda')
const fs = require('fs')

const { fnFld } = require('../Fields/flds')
const { fnObj } = require('../Object/objct')
const { make } = require('../Rgx/make')
const { mix } = require('../../Mix')
const { patt } = require('../Rgx/patterns')
const { take } = require('../Rgx/take')
const { toOrigFls } = require('../Paths/newPath').newPath

const rplacWithNewCmps = R.curry( (cmps, txt) => {
    R.forEach(cmp => {
            txt = R.replace(
                make.cmpByName(getName(cmp)),
                cmp + '\n',
                txt
            )
        },
        cmps
    )
    return txt
})

// const addCmpInexst = R.curry( (InxstCmps, pathFile) => {
//     fs.appendFileSync(
//         pathFile,
//         '\n' + cleanTxtCmps(InxstCmps),
//         'latin1'
//     )
//     return true
// })

// const addCmpExst = R.curry( (exstCmps, pathFile) => {
//     fs.writeFileSync(
//         pathFile,
//         rplacWithNewCmps(
//             exstCmps,
//             mix.fls.gtLtnTxt(pathFile)
//         ),
//         'latin1'
//     )
//     return true
// })

const addCmpInexst = R.curry( (InxstCmps, pathFile) => {
    fs.appendFileSync(
        'Data\\' + mix.cls.pthRoot(pathFile),
        '\n' + cleanTxtCmps(InxstCmps),
        'latin1'
    )
    return true
})

const addCmpExst = R.curry( (exstCmps, pathFile) => {
    fs.writeFileSync(
        'Data\\' + mix.cls.pthRoot(pathFile),
        rplacWithNewCmps(
            exstCmps,
            mix.fls.gtLtnTxt(pathFile)
        ),
        'latin1'
    )
    return true
})

const checkExstCmp = R.curry( (comp, pathFile) => R.test( toRgxNmCmp(comp), mix.fls.gtLtnTxt(pathFile) ))

const checkInxstCmp = R.complement(checkExstCmp)

const cutByExstInOrig = file => R.zipObj(['path','exst','cmpInxst'],
    [file,
     getExstInOrigUnq(file),
     getInxst( getAllInPath(file) )( toOrigFls(file) ).join('\n')] )

const delEmptFldsInTxt = R.pipe(
    take.cmpAll,
    fnObj.toObj,
    mix.fnObj.delDeepEmpty,
    fnObj.cmpsToTxt,
    R.join('\n\n')
)

const getAllInPath = R.pipe(
    mix.fls.gtLtnTxt,
    take.cmpAll
)

const getCmpsByName = R.curry( (cmps, txt) => cmps.map(cmp => {
    return take.cmpByName(getName(cmp), txt)
}))

const getExst = R.curry( (comps, file) => R.filter( cmp => checkExstCmp( cmp, file), comps ) )

const getExstInOrig = file => getExst( getAllInPath(file) )( toOrigFls(file ))

const getUniq = x => R.prepend( '[' + getName(x) + ']', fnFld.getUniq(x) ).join('\n')

const getExstInOrigUnq = R.pipe(
    getExstInOrig,
    R.map(getUniq),
)

const getInxst = R.curry( (comps, file) => R.filter( cmp => checkInxstCmp(cmp, file), comps ) )

const getName = R.pipe(
    R.replace(/(?<=^\[).*?\//g, ''),
    take.cmpHead,
    R.join('')
)

const hasComp = txt => patt.cmpAll.test(txt)

const delEmptyToTxt = R.pipe(
    mix.fnObj.delDeepEmpty,
    fnObj.cmpsToTxt
)

const mergOrgEsp = R.curry( (cmps, file) => delEmptyToTxt(R.mergeDeepRight(
            fnObj.toObj(
                R.unnest(
                    getCmpsByName( cmps, mix.fls.gtLtnTxt( file ) )
                )
            ),
            fnObj.toObj(cmps)
        
    ))
)

const toRgxNmCmp = R.pipe(getName, mix.adapt.toRegExp, make.toRgxNameComp)

const txtCmpsToUniq = R.pipe(
    take.cmpAll,
    R.map(getUniq),
    R.join('\n\n')
)

const cleanTxtCmps = R.pipe(
    txtCmpsToUniq,
    delEmptFldsInTxt
)

module.exports.fnCmp = {
    addCmpExst: addCmpExst,
    addCmpInexst: addCmpInexst,
    checkExstCmp: checkExstCmp,
    checkInxstCmp: checkInxstCmp,
    cleanTxtCmps: cleanTxtCmps,
    cutByExstInOrig: cutByExstInOrig,
    delEmptFldsInTxt: delEmptFldsInTxt,
    delEmptyToTxt: delEmptyToTxt,
    getAllInPath: getAllInPath,
    getCmpsByName,
    getExst: getExst,
    getExstInOrig: getExstInOrig,
    getInxst: getInxst,
    getName: getName,
    getUniq: getUniq,
    hasComp: hasComp,
    hasntComp: R.complement(hasComp),
    mergOrgEsp: mergOrgEsp,
    rplacWithNewCmps,
    toRgxNmCmp: toRgxNmCmp
}
