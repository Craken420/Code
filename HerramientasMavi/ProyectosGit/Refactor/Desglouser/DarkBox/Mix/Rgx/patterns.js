
module.exports.patt = {


    lastLowScript: /_(?!.*?_)/,

    lastPoint: /\.(?!.*?\.)/,

    //=> Entry: 'Name File.txt' Get: '.txt'
    pthExt: /\.\w+$/,

    pthUntilExt: /.*?(?=\.\w+$)/,

    //=> Entry: 'c:/Path/Name File.txt' Get: 'Name File.txt'
    pthRoot: /.*(\\|\/)/,

    //=> 
    nameFileInPth: /(?<=\\)\w+$/
}
