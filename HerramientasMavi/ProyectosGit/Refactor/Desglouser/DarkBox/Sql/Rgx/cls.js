const { patt } = require('./patterns')

const clnComments = txt => {
    txt = txt.replace(patt.mLineComments, '')
    if (patt.mLineComments.test(txt)) {
        return clnComments(txt)
    } else {
        return txt
    }
}

module.exports.cls = {
    ansis: txt => txt.replace(patt.ansis, ''),
    lineComments: txt => txt.replace(patt.lineComments, ''),
    mLineComments: clnComments,
    withNo: txt => txt.replace(patt.withNo, ' ')
}
