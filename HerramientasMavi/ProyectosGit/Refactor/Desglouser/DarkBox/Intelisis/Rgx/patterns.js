
module.exports.patt = {
    //=> Entry: 'ActivoF_Cat_FRM_MAVI' Get: '_MAVI'
    aftrAbbrtObj: /(?<=.*?_(dlg|frm|rep|tbl|vis)(?=_)).*/gi,

    //=> Get: ';Commentary util end of line'
    comments: /^;.*$/gm,

    cmpEnterInHead: /^\[(?=.*?\]$(\r\n|\n)^.*?=.*?$)/gm,

    //=> _FRM_
    abbrtObjBtwnLowScripts: /(?<=_)(dlg|frm|rep|tbl|vis)(?=_)/i,

    //=> Entry: 'ActivoF_Cat_FRM_MAVI' Get: 'ActivoF_Cat_FRM'
    bfrAbbrtObj: /.*?(?<=_)(dlg|frm|rep|tbl|vis)/gi,

    
    /*
    //=> Get: [
                '[Version.frm/AccionePerfilDBMail]
                    Nombre=PerfilDBMail
                    Boton=84',
                '[Version.frm/AccionePerfilDBMail]
                    Nombre=PerfilDBMail
                    Boton=84'
            ]
        '
    */
    cmpAll: /^\[.*?\]((\n|\r)(?!(;.*|)(\n|)^\[.+?\]).*?$)+/gm,
    cmpAllWithComments: /(^;.*[^]|)^\[.*?\]((\n|\r)(?!(^;.*[^]|)^\[.+?\]).*?$)+/gm,
    /*
    //=> Entry:
        [Version.frm/AccionePerfilDBMail]
        Nombre=PerfilDBMail
        Boton=84
    //=> Get:
        Nombre=PerfilDBMail
        Boton=84
    */
   cmpOmitHead: /(?<=^\[.*?\])((\r\n|\r|)(?!^\[.+?\]).*?$)+/gm,

    /*
    //=> Entry:
        [Version.frm/AccionePerfilDBMail]
        Nombre=PerfilDBMail
        Boton=84
    //=> Get:'[Version.frm/AccionePerfilDBMail]'
    */
   cmpHead: /(?<=^\[).*?(?=\]$)/gm,
    /*
    //=> Entry:
        [Version.frm/AccionePerfilDBMail]
        Nombre=PerfilDBMail
        Boton=84
    //=> Get:'Version.frm'
    */
    cmpNameFile: /(?<=^\[).*?(?=\/.*?\])/g,
    
   
    fldFull: /^.*?\=.*?(?=(\r|\n|$))/gm,
    fldName: /^.*?(?=\=)/gm,
    
}
