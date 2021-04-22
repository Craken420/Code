
module.exports.patt = {
    ansis: /SET(?:[\s\n])*(QUOTED_IDENTIFIER|ANSI_NULLS|ANSI_WARNINGS)(?:[\s\n])*(OFF|on)|GO/gi,
    mLineComments: /\/\*(?:[^/*]|\/(?!\*)|\*(?!\/))*\*\//g,
    lineComments: /(\-\-+).*/gm,
    withNo: /(?:[\s\n])*with\((?:[\s\n])*(row|no)lock(?:[\s\n])*\)(?:[\s\n])*/gi
}
