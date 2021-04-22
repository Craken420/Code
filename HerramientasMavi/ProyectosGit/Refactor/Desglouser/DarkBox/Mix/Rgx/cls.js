const R = require('ramda')

const { patt } = require('./patterns')

/*
 Glosary:
    pth: path
*/

module.exports.cls = {
    iniEndSpace: R.pipe(R.split(/\r\n|\r/g), R.map(R.trim), R.join('\n')),
    onlyOneEmptyLine: R.pipe( R.split(/\r\n|\r|\n/g), R.filter(Boolean), R.join('\n') ),
    onlyOneSpace: R.pipe(
        R.split(/\r\n|\r|\n/g),
        R.filter(Boolean),
        R.map(R.replace(/\s+/g, ' ')),
        R.join('\n')
    ),
    pthExt: txt => txt.replace(patt.pthExt, ''),
    pthAllUntlExt: txt => txt.replace(patt.pthUntilExt, ''),
    pthRoot: txt => txt.replace(patt.pthRoot, ''),
    pthFile: txt => txt.replace(patt.nameFileInPth, ''),
    tab: txt => txt.replace(/\t+/, ''),
}
