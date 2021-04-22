let { patt } = require('./patterns')

module.exports.change = {
    lastLowScriptToPoint: txt => txt.replace(patt.lastLowScript, '.'),
}
