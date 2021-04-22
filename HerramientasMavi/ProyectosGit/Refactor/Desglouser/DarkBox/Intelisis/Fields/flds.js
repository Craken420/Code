const R = require('ramda')
const { take } = require('../Rgx/take')
const { mix } = require('../../Mix/index')

const isNewOrExist = (field, txt) => {
    let nameField = take.fldName(field)
    
    if (nameField) {
        if (new RegExp (`^${nameField}=`, `m`).test(txt)) {
            return true
        } else {
            return false
        }
    }
}

const getUniq = R.pipe(
    take.fldFull,
    R.reverse,
    R.map(R.split(/=/)),
    R.fromPairs,
    // mix.obj.delDeepEmpty,
    R.toPairs,
    R.map(R.join('=')),
    R.reverse
)

module.exports.fnFld = {
    isNewOrExist: isNewOrExist,
    getUniq: getUniq
}