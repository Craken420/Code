const R = require('ramda')

const isEmpty = txt => (!txt) ? true : false

module.exports.str = {
    
    isEmpty: isEmpty,
    isntEmpty: R.complement(isEmpty),
    hasWords: R.split//R.pipe(R.split)(R.__)// R.map(R.test(/\w/g))

}