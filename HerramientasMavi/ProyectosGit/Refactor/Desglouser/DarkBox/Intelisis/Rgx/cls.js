let { patt } = require('./patterns')

module.exports.cls = {
    //=> Get: ';Commentary util end of line'
    comments: txt => txt.replace(patt.comments, ''),
    aftrAbbrvitObj: txt => txt.replace(patt.aftrAbbrtObj, ''),
    cmpOmitHead: txt => txt.replace(patt.cmpOmitHead, ''),
}
