[Forma]
Clave=mis_RepInvAnalisisMov
Nombre=General de Movimientos   ( Inventarios )
Icono=0
Modulos=(Todos)
ListaCarpetas=(Variables)
CarpetaPrincipal=(Variables)
AccionesTamanoBoton=15x5
PosicionInicialAltura=213
PosicionInicialAncho=547
ListaAcciones=(Lista)
AccionesCentro=S
AccionesDivision=S
VentanaTipoMarco=Diálogo
VentanaPosicionInicial=Centrado
VentanaExclusiva=S
VentanaEscCerrar=S
PosicionInicialIzquierda=366
ConFormaPrevia=S
ActivoCondicion=(ContSATComprobanteLista:ContSATComprobanteLista.TipoPoliza = <T>Egresos<T>)<BR> y<BR>((SQL( <T>SELECT dbo.fnBuscaMetodoPago(:tId,:tEmpresa,:nQMetodo)<T>,ContSATComprobanteLista:ContSATComprobanteLista.ID, Empresa, 3)) = 1)
FormaPrevia=EspecificarFecha
ActivoCondicion=SQL(<T>select case when (select Acceso From Usuario Where Usuario=<T>+comillas(usuario)+<T>)<BR>In (Select Nombre From TablaStD Where TablaSt = <T>+comillas(<T>PERFILES MAESTROS ART/AGTE<T>)+<T>)<BR>then 1 else 0 End<T>)=1
PosicionInicialArriba=405
SinCondicionDespliege=S
MovModulo=INV
EsMovimiento=S
TituloAuto=S
MovEspecificos=Todos
BarraHerramientas=S
PosicionInicialAlturaCliente=186

VentanaEstadoInicial=Normal
VentanaExclusivaOpcion=4
ExpresionesAlMostrar=Asigna(Info.MovClaveAfecta, <T><T>)<BR>Asigna(Info.Modulo, <T>INV<T>)<BR>Asigna(Info.Almacen, <T>(Todos)<T>)<BR>Asigna(Info.Moneda, Config.ContMoneda)<BR>Asigna(Info.Estatus, <T>Concluido<T>)<BR>Asigna(Info.Sucursal, Nulo)<BR>Asigna(Info.UEN, Nulo)
[(Variables)]
Estilo=Ficha
Clave=(Variables)
AlineacionAutomatica=S
AcomodarTexto=S
MostrarConteoRegistros=S
Zona=A1
Vista=(Variables)
Fuente={MS Sans Serif, 8, Negro, []}
CampoColorLetras=Negro
CampoColorFondo=Blanco
ListaEnCaptura=(Lista)
CarpetaVisible=S
AntesExpresiones=Asigna(Info.Mov,ContSATComprobanteLista:ContSATComprobanteLista.Mov+<T> <T>+ContSATComprobanteLista:ContSATComprobanteLista.MovID)<BR>Asigna(Info.Modulo,ContSATComprobanteLista:ContSATComprobanteLista.OrigenTipo)<BR>Asigna(Info.ID,ContSATComprobanteLista:ContSATComprobanteLista.ID)<BR>Asigna(Info.Ejercicio,ContSATComprobanteLista:ContSATComprobanteLista.Ejercicio)<BR>Asigna(Info.Periodo,ContSATComprobanteLista:ContSATComprobanteLista.Periodo)<BR>Asigna(Info.Tipo,ContSATComprobanteLista:ContSATComprobanteLista.TipoPoliza)
FichaEspacioEntreLineas=7
FichaEspacioNombres=105
FichaNombres=Izquierda
FichaAlineacion=Izquierda
FichaColorFondo=Blanco
FichaAlineacionDerecha=S
FichaEspacioNombresAuto=S
PermiteEditar=S

[Acciones.Cerrar]
Nombre=Cerrar
Boton=23
NombreEnBoton=S
NombreDesplegar=&Cerrar
EnBarraHerramientas=S
EnBarraAcciones=S
AlCambiar=Si ConDatos(ActivoFCat.CveProdSAT)<BR>    Entonces<BR>    Si SQL(<T>SELECT COUNT(CveProdServ) FROM DM0306ProdServ WHERE CveProdServ= :tClave<T>,ActivoFCat.CveProdSAT)=0<BR>        Entonces<BR>        Error(<T>La clave SAT no esta registrada<T>)<BR>        AbortarOperacion<BR>    Fin<BR>Sino<BR>    Error(<T>El campo CveProdSat no debe estar vacio<T>)<BR>    AbortarOperacion<BR>Fin
TipoAccion=Ventana
ClaveAccion=Cancelar
Activo=S
Visible=S

[Acciones.Imprimir.Variables Asignar]
Nombre=Variables Asignar
Boton=0
AlCambiar=Si ConDatos(ActivoFCat.CveProdSAT)<BR>    Entonces<BR>    Si SQL(<T>SELECT COUNT(CveProdServ) FROM DM0306ProdServ WHERE CveProdServ= :tClave<T>,ActivoFCat.CveProdSAT)=0<BR>        Entonces<BR>        Error(<T>La clave SAT no esta registrada<T>)<BR>        AbortarOperacion<BR>    Fin<BR>Sino<BR>    Error(<T>El campo CveProdSat no debe estar vacio<T>)<BR>    AbortarOperacion<BR>Fin
TipoAccion=Controles Captura
ClaveAccion=Variables Asignar
Activo=S
VisibleCondicion=(sql(<T>select familia from art where articulo=:tArt<T>,ActivoF:ActivoF.Articulo)=<T>EDIFICIOS<T>)<BR>o<BR>(sql(<T>select familia from art where articulo=:tArt<T>,ActivoF:ActivoF.Articulo)=<T>TERRENOS<T>)<BR>y<BR>(sql(<T>select count(usuario) from(SELECT Usuario FROM USUARIO WHERE acceso in(select Nombre from tablastd where tablast=:tUsu1))x where usuario=:tusu<T>,<T>CFG PERFIL COSTOS AF<T>,USUARIO))=1
Visible=S

[Acciones.Imprimir]
Nombre=Imprimir
Boton=4
NombreEnBoton=S
NombreDesplegar=&Imprimir
Multiple=S
CondicionDespliege=(sql(<T>select familia from art where articulo=:tArt<T>,ActivoF.Articulo)=<T>EDIFICIOS<T>)<BR>o<BR>(sql(<T>select familia from art where articulo=:tArt<T>,ActivoF.Articulo)=<T>TERRENOS<T>)<BR>y                                       <BR>(sql(<T>select count(usuario) from(SELECT Usuario FROM USUARIO WHERE acceso in (select Nombre from tablastd where tablast=:tUsu1))x where usuario=:tusu<T>,<T>CFG PERFIL COSTOS AF<T>,Usuario))=1
CondicionDespliege=(sql(<T>select familia from art where articulo=:tArt<T>,Articulo)=<T>EDIFICIOS<T>)<BR>o<BR>(sql(<T>select familia from art where articulo=:tArt<T>,Articulo)=<T>TERRENOS<T>)<BR>y<BR>(sql(<T>select count(usuario) from(SELECT Usuario FROM USUARIO WHERE acceso in (select Nombre from tablastd where tablast=:tUsu1))x where usuario=:tusu<T>,<T>CFG PERFIL COSTOS AF<T>,usuario))=1
EnBarraHerramientas=S
EnMenu=S
EnBarraAcciones=S
EspacioPrevio=S
ValorRefrescar=Si ActivoFijo:ActivoFijo.Mov en(<T>Mantenimiento Ligero<T>,<T>Mantenimiento Severo<T>,<T>Mannto Maquinaria<T>)<BR>  Entonces<BR>    Si ActivoFijo:ActivoFijo.Concepto en(<T>OMITIR MANNTO<T>)<BR>      Entonces<BR>        Caso  (SQL(<T>SELECT UltimoTipoServicio FROM ActivoF WHERE Empresa=:tEmp AND Articulo=:tArt AND Serie=:tSerie<T>,<T>MAVI<T>,Articulo,Serie))<BR>          Es <T>Severo<T> Entonces <T>Ligero*<T><BR>          Es <T>Severo*<T> Entonces <T>Ligero*<T><BR>          Es <T>Ligero<T> Entonces <T>Severo*<T> <BR>          Es <T>Ligero*<T> Entonces <T>Severo*<T><BR>          Sino <T>Ligero<T><BR>        Fin<BR>      Sino<BR>        Caso  (SQL(<T>SELECT UltimoTipoServicio FROM ActivoF WHERE Empresa=:tEmp AND Articulo=:tArt AND Serie=:tSerie<T>,<T>MAVI<T>,Articulo,Serie))<BR>          Es <<CONTINUA>
ValorRefrescar002=<CONTINUA>T>Severo<T> Entonces <T>Ligero<T><BR>          Es <T>Severo*<T> Entonces <T>Ligero<T><BR>          Es <T>Ligero*<T> Entonces <T>Severo<T><BR>          Es <T>Ligero<T> Entonces <T>Severo<T><BR>          Sino <T>Ligero<T><BR>        Fin<BR>      Fin<BR>  Fin
TipoAccion=Controles Captura
ClaveAccion=Variables Asignar / Ventana Aceptar
ListaAccionesMultiples=Variables Asignar<BR>mis_InvAnalisisMov
Activo=S
Visible=S

[Acciones.Preliminar.Variables Asignar]
Nombre=Variables Asignar
Boton=0
VisibleCondicion=Si SQL(<T>SELECT COUNT(U.USUARIO) VAL FROM USUARIO U JOIN TABLASTD T ON U.USUARIO=T.NOMBRE WHERE T.TABLAST=:ttab AND T.VALOR =:tins AND U.USUARIO=:tusr<T>,<T>ACCESO_VIGENCIAS_INSTITUCIONES<T>,<T>INSTITUCIONES<T>,Usuario)=1<BR>entonces<BR>Verdadero
TipoAccion=Controles Captura
ClaveAccion=Variables Asignar
CondicionEdicion=SQL(<T>SELECT COUNT(A.Mov) FROM ActivoFijo A JOIN ActivoFijoD D ON A.ID = D.ID WHERE D.Articulo =:tArt AND D.Serie =:tSerie AND A.Estatus IN(:tConc, :tPend) AND A.mov IN(:tLig, :tSev, :tMant)<T>,Articulo, Serie, <T>CONCLUIDO<T>, <T>PENDIENTE<T>, <T>Mantenimiento Ligero<T>, <T>Mantenimiento Severo<T>, <T>Mantenimiento<T>)=0 
Activo=S
Visible=S
SQL.Cambios=Eliminar<TAB>SELECT DISTINCT af.Articulo, a.Descripcion1, a.Descripcion2, a.Categoria, a.Grupo, a.Familia, a.Fabricante, a.Linea, a.CategoriaActivoFijo<BR>Eliminar<TAB>  FROM ActivoF af<BR>Eliminar<TAB>  JOIN Art a ON a.Articulo = af.Articulo<BR>Eliminar<TAB> WHERE af.Empresa = <T>{Empresa}<T><BR>Insertar<TAB>SELECT<TAB>0<BR>Insertar<TAB>  ActivoF.ID,<TAB>1<BR>Insertar<TAB>  ActivoF.Empresa,<TAB>2<BR>Insertar<TAB>  ActivoF.Articulo as Articulo,<TAB>3<BR>Insertar<TAB>  ActivoF.Serie,<TAB>4<BR>Insertar<TAB>  ActivoF.Estatus,<TAB>5<BR>Insertar<TAB>  Art.Articulo,<TAB>6<BR>Insertar<TAB>  Art.Descripcion1,<TAB>7<BR>Insertar<TAB>  Art.Descripcion2,<TAB>8<BR>Insertar<TAB>  Art.Grupo,<TAB>9<BR>Insertar<TAB>  Art.Categoria,<TAB>10<BR>Insertar<TAB>  Art.CategoriaActivoFijo,<TAB>11<BR>Insertar<TAB>  Art.Familia,<TAB>12<BR>Insertar<TAB>  Art.Fabricante,<TAB>13<BR>Insertar<TAB>  Art.Linea,<TAB>14<BR>Insertar<TAB>  Vehiculo.Vehiculo as Unidad,<TAB>15<BR>Insertar<TAB>  Vehiculo.Descripcion as NombreUnidad,<TAB>16<BR>Insertar<TAB>  Vehiculo.Placas as Placas,<TAB>17<BR>Insertar<TAB>  Vehiculo.Serie,<TAB>18<BR>Insertar<TAB>  Vehiculo.Descripcion1 as GrupoUnidad,<TAB>19<BR>Insertar<TAB>  Vehiculo.Descripcion2 as PuntoReunion,<TAB>20<BR>Insertar<TAB>  Vehiculo.Descripcion3 as ModeloUnidad,<TAB>21<BR>Insertar<TAB>  Vehiculo.Descripcion4 as MarcaUnidad,<TAB>22<BR>Insertar<TAB>  Vehiculo.Descripcion5 as UsoUnidad<TAB>23<BR>Insertar<TAB><TAB>24<BR>Insertar<TAB>FROM<TAB>25<BR>Insertar<TAB>  ActivoF<TAB>26<BR>Insertar<TAB>  LEFT OUTER JOIN Art ON ActivoF.Articulo=Art.Articulo<TAB>27<BR>Insertar<TAB>  LEFT OUTER JOIN Vehiculo ON ActivoF.Articulo=Vehiculo.Articulo AND ActivoF.Serie=Vehiculo.Serie<TAB>28
FormulaSQL={Si(General.ContXCancelarMismoMes, 'CASE WHEN Cxc.GenerarDinero = 0 AND Cxc.Dinero IS NOT NULL AND Cxc.DineroID IS NOT NULL AND Cxc.DineroCtaDinero IS NOT NULL THEN (SELECT Dinero.FechaEmision FROM Dinero WHERE Dinero.MovID = Cxc.DineroID AND Dinero.Mov = Cxc.Dinero AND Dinero.Empresa = Cxc.Empresa AND Dinero.CtaDinero = Cxc.DineroCtaDinero AND (CASE WHEN Dinero.Estatus = '+Comillas(EstatusPendiente)+' THEN '+Comillas(EstatusConcluido)+' ELSE Dinero.Estatus END) = (CASE WHEN Cxc.Estatus = '+Comillas(EstatusPendiente)+' THEN '+Comillas(EstatusConcluido)+' ELSE Cxc.Estatus END)) ELSE Cxc.FechaEmision END', 'CASE WHEN Cxc.Estatus = '+Comillas(EstatusCancelado)+' THEN CASE WHEN Cxc.GenerarDinero = 0 AND Cxc.Dinero IS NOT NULL AND Cxc.DineroID IS NOT NULL AND Cxc.DineroCtaDinero IS NOT NULL THEN (SELECT Dinero.FechaCancelacion FROM Dinero WHERE Dinero.MovID = Cxc.DineroID AND Dinero.Mov = Cxc.Dinero AND Dinero.Empresa = Cxc.Empresa AND Dinero.CtaDinero = Cxc.DineroCtaDinero AND Dinero.Estatus = Cxc.Est;atus) ELSE Cxc.FechaCancelacion END ELSE CASE WHEN Cxc.GenerarDinero = 0 AND Cxc.Dinero IS NOT NULL AND Cxc.DineroID IS NOT NULL AND Cxc.DineroCtaDinero IS NOT NULL THEN (SELECT Dinero.FechaEmision FROM Dinero WHERE Dinero.MovID = Cxc.DineroID AND Dinero.Mov = Cxc.Dinero AND Dinero.Empresa = Cxc.Empresa AND Dinero.CtaDinero = Cxc.DineroCtaDinero AND (CASE WHEN Dinero.Estatus = '+Comillas(EstatusPendiente)+' THEN '+Comillas(EstatusConcluido)+' ELSE Dinero.Estatus END) = (CASE WHEN Cxc.Estatus = '+Comillas(EstatusPendiente)+' THEN '+Comillas(EstatusConcluido)+' ELSE Cxc.Estatus END)) ELSE Cxc.FechaEmision END END')}

[Acciones.Preliminar]
Nombre=Preliminar
Boton=6
NombreEnBoton=S
NombreDesplegar=&Preliminar
Multiple=S
EnBarraHerramientas=S
ExpAntesRefrescar=Si<BR>  CONDATOS(RM0906PreliminarCobroCteVis:CLIENTE)  y mavi.ban=1<BR>Entonces<BR>    Asigna(Info.Cliente,RM0906PreliminarCobroCteVis:CLIENTE)<BR>    Asigna(Info.Cuenta,RM0906PreliminarCobroCteVis:CLIENTE)<BR>    Asigna(Info.Descripcion,RM0906PreliminarCobroCteVis:NOMBRE)<BR>    Asigna(Info.Modulo,<T>CxC<T>)<BR> Sino<BR>    Si<BR>         VACIO(RM0906PreliminarCobroCteVis:CLIENTE)<BR>    Entonces<BR>         Informacion(<T>No existe ningún Cliente Con las caracterìsticas Especificadas<T>)<BR>    Fin<BR>    Asigna(Info.Cliente,<T><T>)<BR>    asigna(mavi.ban,1)<BR>Fin <BR>Asigna(Info.ID, SQL(<T>SELECT ID FROM CxC WHERE RTRIM(LTRIM(Mov))+ RTRIM(LTRIM(MovID))=:tmovid<T>, RM0906PreliminarCobroVis:PADRE& RM0906PreliminarCobroVis:PADREID )) 
ListaAccionesMultiples=Variables Asignar<BR>mis_InvAnalisisMov
Activo=S
ExpresionesAlCerrar=EJECUTARSQL(<T>spActualizaPropreArtFam<T>)
Visible=S
Formula=Si<BR>  SQL(<T>SELECT COUNT(CveProdServ) FROM DM0306ArtProdServExcep WITH(NOLOCK) WHERE Articulo= :tArticulo<T>,Art.Articulo)>0<BR>Entonces<BR>  SQL(<T>SELECT CveProdServ FROM DM0306ArtProdServExcep WITH(NOLOCK) WHERE Articulo= :tArticulo<T>,Art.Articulo)<BR>Sino<BR>Si<BR>SQL(<T>SELECT COUNT(C.CveProdSAT) FROM ActivoFCat C JOIN Art A ON A.CategoriaActivoFijo = C.Categoria WHERE A.Articulo= :tArticulo<T>,Art.Articulo)>0<BR>Entonces<BR>SQL(<T>SELECT C.CveProdSAT FROM ActivoFCat C JOIN Art A ON A.CategoriaActivoFijo = C.Categoria WHERE A.Articulo= :tArticulo<T>,Art.Articulo) <BR>Sino<BR>  SQL(<T>SELECT CveProdSAT FROM ArtLinea WITH(NOLOCK) WHERE Linea= :tLinea<T>,Art.Linea)<BR>Fin<BR>Fin

[Acciones.Imprimir.mis_InvAnalisisMov]
Nombre=mis_InvAnalisisMov
Boton=0
ValidacionCondicion=(SQL(<T>SELECT COUNT(0) FROM NivelCobranzaMavi WHERE Nombre =:tNivel <T>,NivelCobranzaMAVI) > 0) o (SQL(<T>SELECT COUNT(0) FROM NivelesEspecialesCobranzaMavi WHERE Nombre =:tNivel <T>,NivelCobranzaMAVI) > 0)
Totalizadores1=Total Recibos<BR>Total Cuentas Diferentes<BR>Total Promedio Recibos<BR>Total Fajillas<BR>Total Flyers x Sucursal
Totalizadores2=SumaTotal(DM0316FlyersVis:ContadorRecibos)<BR>SumaTotal(DM0316FlyersVis:nCtes)<BR>DM0316FlyersVis:TotalPromReci<BR>SumaTotal(DM0316FlyersVis:Fajillas)<BR>(SumaTotal(DM0316FlyersVis:FlyersXSucursal))+Info.Cantidad2+Info.Cantidad3
Totalizadores3=(Cantidades)<BR>(Cantidades)<BR><BR>(Cantidades)<BR>(Cantidades)
ListaEnCaptura=Total Recibos<BR>Total Cuentas Diferentes<BR>Total Fajillas<BR>Total Flyers x Sucursal<BR>Total Promedio Recibos
SQL.Cambios=Eliminar<TAB>  LEFT OUTER JOIN CtaSituacion ON {Comillas(<T>INV<T>)}=CtaSituacion.Rama AND Art.Situacion=CtaSituacion.Situacion<BR>Insertar<TAB>  LEFT OUTER JOIN CtaSituacion ON {Comillas(<T>INV<T>)}=CtaSituacion.Rama <TAB>34<BR>Insertar<TAB>AND Art.Situacion=CtaSituacion.Situacion<TAB>35<BR>Insertar<TAB>WHERE <TAB>36<BR>Insertar<TAB>ART.CATEGORIA LIKE ISNULL((SELECT CASE WHEN CATEGORIA=<T> <T> THEN <T>%%<T> ELSE <T>%<T>+CATEGORIA+<T>%<T> END <TAB>37<BR>Insertar<TAB>FROM DM0144ArtPerfilesXAgrupador WHERE ID =<TAB>38<BR>Insertar<TAB>(SELECT ARTD.ID FROM DM0144ArtDPerfilesXAgrupador ARTD <TAB>39<BR>Insertar<TAB>WHERE ARTD.GRUPOTRABAJO = <TAB>40<BR>Insertar<TAB>(SELECT U.GRUPOTRABAJO FROM USUARIO U WHERE U.USUARIO = {COMILLAS(USUARIO)}))),<T>%%<T>)<TAB>41<BR>Insertar<TAB>AND<TAB>42<BR>Insertar<TAB>ART.GRUPO LIKE ISNULL((SELECT CASE WHEN GRUPO=<T> <T> THEN <T>%%<T> ELSE <T>%<T>+GRUPO+<T>%<T> END <TAB>43<BR>Insertar<TAB>FROM DM0144ArtPerfilesXAgrupador WHERE ID =<TAB>44<BR>Insertar<TAB>(SELECT ARTD.ID FROM DM0144ArtDPerfilesXAgrupador ARTD <TAB>45<BR>Insertar<TAB>WHERE ARTD.GRUPOTRABAJO = <TAB>46<BR>Insertar<TAB>(SELECT U.GRUPOTRABAJO FROM USUARIO U WHERE U.USUARIO = {COMILLAS(USUARIO)}))),<T>%%<T>)<TAB>47<BR>Insertar<TAB>AND<TAB>48<BR>Insertar<TAB>ART.FAMILIA LIKE ISNULL((SELECT CASE WHEN FAMILIA=<T> <T> THEN <T>%%<T> ELSE <T>%<T>+FAMILIA+<T>%<T> END <TAB>49<BR>Insertar<TAB>FROM DM0144ArtPerfilesXAgrupador WHERE ID =<TAB>50<BR>Insertar<TAB>(SELECT ARTD.ID FROM DM0144ArtDPerfilesXAgrupador ARTD <TAB>51<BR>Insertar<TAB>WHERE ARTD.GRUPOTRABAJO = <TAB>52<BR>Insertar<TAB>(SELECT U.GRUPOTRABAJO FROM USUARIO U WHERE U.USUARIO = {COMILLAS(USUARIO)}))),<T>%%<T>)<TAB>53
ExpresionesAlMostrar=SI SQL(<T>SELECT count(*) FROM USUARIO U<BR>    INNER JOIN TABLASTD TB ON TB.NOMBRE = U.ACCESO<BR>WHERE usuario =:tUsu<BR>    AND TB.TablaSt =:tTb<T>,USUARIO,<T>OMITIR CAMBIO DE CONTRASEÑA<T>)=1<BR>ENTONCES<BR>    ABORTAROPERACION<BR>FIN
CondicionVisible=((sql(<T>select count(usuario) from(SELECT Usuario FROM USUARIO WHERE acceso in (select Nombre from tablastd where tablast=:tUsu1))x where usuario=:tusu<T>,<T>CFG PERFIL COSTOS VTAS<T>,usuario))=1 y<BR>(sql(<T>select costos from usuario where usuario=:tUsu1<T>,Usuario)=<T>1<T>) y<BR>(sql(<T>select categoria from art where articulo=:tArt<T>,Info.Articulo)=<T>VENTA<T>) y<BR>(sql(<T>select grupo from art where articulo=:tArt<T>,Info.Articulo)=<T>MERCANCIA DE LINEA<T>))<BR> o<BR>((sql(<T>select costos from usuario where usuario=:tUsu1<T>,Usuario)=<T>1<T>) y<BR>(sql(<T>select categoria from art where articulo=:tArt<T>,Info.Articulo)<><T>VENTA<T>) y<BR>(sql(<T>select grupo from art where articulo=:tArt<T>,Info.Articulo)<><T>MERCANCIA DE LINEA<T>))
TipoAccion=Reportes Impresora
FiltroGeneral=VentaCteD.Estacion = {EstacionTrabajo} AND VentaCteD.Empresa=<T>{Empresa}<T> AND<BR>VentaCteD.Mov IN (<T>Factura<T>,<T>Factura VIU<T>,<T>Factura Mayoreo<T>,<T>Credilana<T>,<T>Prestamo Personal<T>,<T>Seguro Auto<T>,<T>Seguro Vida<T>) AND<BR>VentaCteD.Cliente=<T>{Info.Cliente}<T><BR>{Si(ConDatos(Info.EnviarA), <T> AND VentaCteD.EnviarA = <T>+Info.EnviarA, <T><T>)}
ClaveAccion=mis_InvAnalisisMov
FiltroAbierto=Compra.Empresa = <T>{Empresa}<T><BR>  AND Compra.Estatus <> <T>SINAFECTAR<T><BR>  AND Compra.FechaEmision BETWEEN <T>{FechaFormatoServidor(Info.FechaD)}<T> AND <T>{FechaFormatoServidor(Info.FechaA)}<T><BR>  {Si(ConDatos(Info.ProveedorD),   <T> AND Compra.Proveedor BETWEEN <T>+Comillas(Info.ProveedorD)+<T> AND <T>+Comillas(Info.ProveedorA),  <T><T>)}<BR>  {Si(ConDatos(Info.AgenteD),      <T> AND Compra.Agente  BETWEEN <T>+Comillas(Info.AgenteD)+ <T> AND <T>+Comillas(Info.AgenteA),  <T><T>)}<BR>  {Si(ConDatos(Info.Almacen),      <T> AND Compra.Almacen  = <T>+Comillas(Info.Almacen)  ,  <T><T>)}<BR>  {Si(ConDatos(Info.Moneda),       <T> AND Compra.Moneda   = <T>+Comillas(Info.Moneda)  ,  <T><T>)}<BR>  {Si(ConDatos(Info.ProvCat),      <T> AND Prov.Categoria  = <T>+Comillas(Info.ProvCat)  ,  <T><CONTINUA>
FiltroAbierto002=<CONTINUA><T>)}<BR>  {Si(ConDatos(Info.ProvFam),      <T> AND Prov.Familia    = <T>+Comillas(Info.ProvFam)  ,  <T><T>)}<BR>  {Si(ConDatos(Info.Sucursal),     <T> AND Compra.Sucursal = <T>+(Info.Sucursal)  ,  <T><T>)}<BR>  {Si(ConDatos(Info.UEN),          <T> AND Compra.UEN = <T>+(Info.UEN)  ,  <T><T>)}<BR>  {Si(ConDatos(Info.MovClaveAfecta), <T> AND Compra.Mov   = <T>+Comillas(Info.MovClaveAfecta)  ,  <T><T>)}<BR>  {Si(ConDatos(Info.Estatus),  <T> AND Compra.Estatus   = <T>+Comillas(Info.Estatus)  ,  <T><T>)}

[Acciones.Preliminar.mis_InvAnalisisMov]
Nombre=mis_InvAnalisisMov
Boton=0
ValorPorOmision=SQL(<T>SELECT CATEGORIA FROM  DM0144ArtdPerfilesXAgrupador GT INNER JOIN DM0144ArtPerfilesXAgrupador P ON GT.ID = P.ID WHERE GT.GrupoTrabajo = (SELECT GrupoTrabajo FROM USUARIO WHERE USUARIO={COMILLAS(USUARIO)})<T>)
FiltroGeneral=Art.Tipo<><T>Estructura<T><BR>{Si(ConDatos(Info.Proveedor), <T> AND (Art.Proveedor = <T>+Comillas(Info.Proveedor)+<T> OR (Articulo IN (SELECT Articulo FROM ArtProv WHERE Proveedor = <T>+Comillas(Info.Proveedor)+<T>)))<T>, <T><T>)}<BR>{SI(SQL(<T>SELECT COUNT(Acceso) FROM dbo.TablaStD St INNER JOIN dbo.Usuario U ON St.Nombre=U.Acceso WHERE TablaSt=:tPer AND U.Usuario=:tUs<T>,<T>CFG PERFIL COSTOS VTAS<T>,Usuario)=1,<T><T>,<T> AND Art.Categoria NOT IN (<T>+Comillas(<T>VENTA<T>)+<T>)<T>)}
ExpresionesAntes=Si(Vacio(Info.ProveedorD), Asigna(Info.ProveedorD, sql(<T>Select Min(Proveedor) from Prov<T>)))<BR>Si(Vacio(Info.ProveedorA), Asigna(Info.ProveedorA, sql(<T>Select Max(Proveedor) from Prov<T>)))<BR>Si(Info.Almacen=<T>(TODOS)<T>, Asigna(Info.Almacen, Nulo))<BR>Si(Info.Moneda=<T>(Todas)<T>, Asigna(Info.Moneda, Nulo))<BR>Si(Info.MovClaveAfecta = <T><T>, Asigna(Info.MovClaveAfecta, Nulo))<BR>Si(Info.ProvCat=<T>(Todos)<T>, Asigna(Info.ProvCat, Nulo))<BR>Si(Info.ProvFam=<T>(Todos)<T>, Asigna(Info.ProvFam, Nulo))<BR>Si(Info.Estatus=<T>(Todos)<T>, Asigna(Info.Estatus, Nulo))<BR>Asigna(Rep.Suma, 0.0)<BR>Asigna(Rep.Suma1, 0.0)<BR>Asigna(Rep.Suma2, 0.0)<BR>Asigna(Rep.Grupo1, 0.0)<BR>Asigna(Rep.Grupo2, 0.0)<BR>Asigna(Rep.Grupo3, 0.0)
EjecucionCondicion=SI SQL(<T> SELECT dbo.fn_DM0187ValidaContrasena(<T>+COMILLAS(USuario:Usuario.Contrasena)+<T>) <T>) = 1<BR>    ENTONCES<BR>       INFORMACION(<T>Tu contraseña debe tener Numeros y Letras<T>)<BR>       FALSO<BR>    SINO<BR>       SI SQL(<T> SELECT dbo.fn_DM0187ValidaContrasena(<T>+COMILLAS(USuario:Usuario.Contrasena)+<T>) <T>) = 3<BR>          ENTONCES<BR>            INFORMACION(<T>La Longitud debe ser mayor a 6 Caracteres<T>)<BR>            FALSO<BR>          SINO<BR>             SI SQL(<T> SELECT dbo.fn_DM0187ContrasenaInsegura(<T>+COMILLAS(Usuario:Usuario.Contrasena)+<T>) <T>) = 1<BR>                ENTONCES<BR>                  INFORMACION(<T>Contraseña Insegura,Intenta con Otra contraseña.<T>)<BR>                  FALSO<BR>             SINO<BR>                Asigna(Info.Contrasena,MD5(<CONTINUA>
EjecucionCondicion002=<CONTINUA>Usuario:Usuario.Contrasena,<T>p<T>))<BR>                   SI sql(<T>select Contrasena from usuario where Usuario =:tUsu<T>,Usuario:Usuario.Usuario) = Info.Contrasena<BR>                      ENTONCES<BR>                         ERROR(<T>Tu contraseña debe ser diferente a la Anterior<T>)<BR>                         FALSO<BR>                      SINO<BR>                         SI Usuario:Usuario.Contrasena <> Usuario.Contrasena<BR>                            ENTONCES<BR>                              VERDADERO<BR>                            SINO<BR>                               ERROR(<T>Es necesario que Cambie su Contraseña<T>)<BR>                               FALSO<BR>                            FIN<BR>                     FIN<BR>              FIN<BR>       FIN<BR>FIN
TipoAccion=Reportes Pantalla
ClaveAccion=mis_InvAnalisisMov

[(Variables).ListaEnCaptura]
(Inicio)=Info.Sucursal
Info.Sucursal=Info.UEN
Info.UEN=Info.MovClaveAfectaRI
ExpresionesAntes=asigna(Info.ConMovimientos,mayusculas(Info.ConMovimientos))<BR><BR>Si(Vacio(Info.CuentaD),Asigna(Info.CuentaD,SQL(<T>SELECT MIN(Cuenta) FROM Cta WHERE Tipo<>:tTipo<T>, TipoEstructura)),<T><T>))<BR><BR>Si(Vacio(Info.CuentaA),Asigna(Info.CuentaA,SQL(<T>SELECT MAX(Cuenta) FROM Cta WHERE Tipo<>:tTipo<T>, TipoEstructura)),<T><T>))
Info.MovClaveAfectaRI=Info.Moneda
Info.Moneda=Info.Estatus
Info.Estatus=Info.Almacen
ExpAntesRefrescar=Si<BR>  CONDATOS(PreliminarCobroPPCteVis:CLIENTE)  y mavi.ban=1<BR>Entonces<BR>    Asigna(Info.ClienteA,PreliminarCobroPPCteVis:CLIENTE)<BR>    Asigna(Info.Cuenta,PreliminarCobroPPCteVis:CLIENTE)<BR>    Asigna(Info.Descripcion,PreliminarCobroPPCteVis:NOMBRE)<BR>    Asigna(Info.Modulo,<T>CxC<T>)<BR> Sino<BR>    Si<BR>         VACIO(PreliminarCobroPPCteVis:CLIENTE)<BR>    Entonces<BR>         Informacion(<T>No existe ningún Cliente Con las caracterìsticas Especificadas<T>)<BR>    Fin<BR>    Asigna(Info.ClienteA,<T><T>)<BR>    asigna(mavi.ban,1)<BR>Fin
Info.Almacen=Info.FechaD}
ExpresionesAlMostrar=EjecutarSQL(<T>EXEC SP_ACD00022CargarZonasAgentes<T>)
Info.FechaD=Info.FechaA
Info.FechaA=(Fin)

[Usuario]
Clave=Usuario
Nombre=Usuario
Visible=S
TamanoValidacion=10
Tamano=10
Mayusculas=S
AyudaEnCaptura=Vista
AyudaForma=UsuarioLista
AyudaVista=Usuario
AyudaCampo=Usuario.Usuario
AyudaMultiple=S
ValidacionUsaTabla=S
ValidacionTablas=Usuario

[AyudaExpresion]
Clave=AyudaExpresion
Nombre=Expresión
Visible=S
TamanoValidacion=50x3
TipoDatos=Memo
AyudaExpresionesForma=Info.Referencia
AyudaEnCaptura=Editor Expresiones