const R = require('ramda')

/* Paths */
const chardet   = require('chardet')
const fs        = require('fs')
const iconvlite = require('iconv-lite')
const path = require('path')

const exist = fs.existsSync
const dtcCod = chardet.detectFileSync
const rd = fs.readFileSync

const isFl = pathFl => fs.statSync(pathFl).isFile()
const recode = R.curry( (cod, buffer) => iconvlite.decode( rd(buffer), cod) )

/* Combination */
const isFlAndExist = R.both(exist, isFl)

const getTxtInOrgnCod = pathFl => recode(pathFl)(dtcCod(pathFl))
const chckAndGtInOrgnCod  = R.both(isFlAndExist, getTxtInOrgnCod)

const getLtnTxt = pathFl => rd(pathFl, 'Latin1')
const chckAndGtLtnTxt = R.both(isFlAndExist, getLtnTxt)

const getPathsFiles = pathDir => fs.readdirSync(pathDir).map(x => path.resolve(pathDir, x))
const filterFiles = R.curry((ext, files) => files.filter(x => ext.indexOf(path.extname(x)) > -1 && fs.statSync(x).isFile()))
const getFiltFls = R.curry((ext, files) => filterFiles(ext, getPathsFiles(files)))

// const getFiltFls = (ext, dir) => getFilterFile(ext, getPathsFiles(dir))

module.exports.fls = {
    chckAndGtLtnTxt: chckAndGtLtnTxt,
    dtcCod: dtcCod,
    exist: exist,
    getFiltFls: getFiltFls,
    getTxtInOrgnCod: chckAndGtInOrgnCod,
    gtLtnTxt: getLtnTxt,
    isFl: isFl,
    rd: rd,
    recode: recode
}
