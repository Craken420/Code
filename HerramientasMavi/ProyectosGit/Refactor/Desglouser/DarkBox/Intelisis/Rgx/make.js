let { adapt } = require('../../Mix/Rgx/adapt')

module.exports.make = {
    cmpByName: nameComp => new RegExp(`\\[\\b${adapt.toRegExp(nameComp)}\\b\\]((\\n|\\r)(?!^\\[.+?\\]).*?$)+`, `gm`),
    cmpByNameFile: nameFile => new RegExp(`^\\[${adapt.toRegExp(nameFile)}\\/.*?\\]((\\n|\\r)(?!^\\[.+?\\]).*?$)+`, `gm`),
    cmpExist: nameComp => new RegExp(`^\\[${adapt.toRegExp(nameComp.join(''))}\\]`, `gm`),
    cmpInTheEnd: nameComp => new RegExp (`(?<=\\[${nameComp}\\](\\r\\n(?!^\\[.+?\\]).*?$)+)`,`m`),
    cmpOutSide: nameComp => new RegExp(`\\[(?!(\\b${adapt.toRegExp(nameComp)}\\b)).*?\\/.*?\\]((\\n|\\r)(?!^\\[.+?\\]).*?$)+`, `gim`),
    // outSide: nameComp => new RegExp(`\\[(?!(\\b${adapt.toRegExp(nameComp)}\\b|Acciones)).*?\\]((\\n|\\r)(?!^\\[.+?\\]).*?$)+`, `gm`),
    fldContnt: field => new RegExp(`(?<=^${adapt.toRegExp(field)}\=).*?(?=(\\r|\\n|$))`, `gm`),
    toRgxNameComp: nameComp => new RegExp(`^\\[\\b${nameComp}\\b\\]`, `gm`)

}
