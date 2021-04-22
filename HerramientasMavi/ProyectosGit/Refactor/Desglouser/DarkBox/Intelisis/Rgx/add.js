const { patt } = require('./patterns')

module.exports.add = {
    cmpEnterInHead: txt => txt.replace(patt.cmpEnterInHead, '\n[')
}