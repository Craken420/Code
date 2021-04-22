
module.exports.mix = {
    adapt: require('./Rgx/adapt').adapt,
    add: require('./Rgx/add').add,
    change: require('./Rgx/change').change,
    cls: require('./Rgx/cls').cls,
    fls: require('./PathWay/files').fls,
    make: require('./Rgx/make').make,
    fnObj: require('./Objects/obj').obj,
    patt: require('./Rgx/patterns').patt,
    str: require('./Strings/str').str,
    take: require('./Rgx/take').take,
    txtToRgx: require('./Rgx/txtToRgx').txtToRgx
}
