const R = require('ramda')

const delDeepEmpty = objEntry =>{
    let obj = R.clone(objEntry)
    
    for (key in obj) {
        if (typeof(obj[key]) == 'string') {
            if (obj[key] == ''||obj[key] == undefined) delete obj[key]
        } else if (typeof(obj[key]) == 'object') {
            if(JSON.stringify(obj[key]) == '{}'){
                delete obj[key]
            } else {
                delDeepEmpty(obj[key])
            }
        } else {
            return false
        }
    }
    return obj
}

module.exports.obj = {
    delDeepEmpty: delDeepEmpty,
}