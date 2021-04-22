const R = require('ramda')
const { fnCmp } = require('../Comp/cmpnt')
const { fnFld } = require('../Fields/flds')
const { take } = require('../Rgx/take')

const getName = R.pipe(
    R.replace(/(?<=^\[).*?\//g, ''),
    take.cmpHead,
    R.join('')
)

const fldsToObj = R.pipe(

    // take.fldFull,
    R.match(/^[^\[]*?[^=]*?$/gm),
    R.map(R.split(/=/)),
    R.fromPairs
)

const cmpToObj = cmp => R.objOf( getName(cmp), fldsToObj( fnFld.getUniq(cmp).join('\n') ) )

const toObj = R.pipe(
    take.cmpAll,
    R.map(cmpToObj),
    R.mergeAll
)

//--------------------------

const fldsToTxt = R.pipe(
    R.map(R.join('=')),
    R.join('\n')
)

const cmpsToTxt = R.pipe(
    R.map(R.toPairs),
    R.map(fldsToTxt),
    R.toPairs,
    R.map(R.join(']\n')),
    R.map(R.replace(/^/, '['))
)

const toTxt = R.pipe(
    cmpsToTxt,
    R.join('\n')
)

module.exports.fnObj = {
    fldsToObj: fldsToObj,
    fldsToTxt: fldsToTxt,
    cmpToObj: cmpToObj,
    cmpsToTxt: cmpsToTxt,
    clsContinua: require('./clsContinueFields').continueFields,
	toObj: toObj,
    toTxt: toTxt
}