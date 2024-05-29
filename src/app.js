const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');




const usuarios = require('./routers/rutasusuario');
const proveedores = require('./routers/rutasproveedores');
const roles = require('./routers/rutasroles');
const permisos = require('./routers/rutaspermisos');
const rol_permiso = require('./routers/rutasrol_permiso');
const categorias = require('./routers/rutascategorias');
const insumos = require('./routers/rutasinsumos');
const clientes = require('./routers/rutasclientes');
const compras = require('./routers/rutascompra');
const detalles_compras = require('./routers/rutasdetalles_compras');
const productos = require('./routers/rutasproductos');
const fichas_tecnicas = require('./routers/rutasficha_tecnica');
const ventas = require('./routers/rutasventas');
const detalles_ventas = require('./routers/rutasdetalles_venta');
const estados = require('./routers/rutasestados');
const clientes_aplicacion = require('./routers/rutascliente_aplicacion');
const sesiones = require('./routers/rutassesiones');
const registro = require('./routers/rutasclientes');

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('port', config.app.port);

//rutas
app.use('/api/usuarios', usuarios);
app.use('/api/proveedores', proveedores);
app.use('/api/roles', roles);
app.use('/api/permisos', permisos);
app.use('/api/rol_permiso', rol_permiso);
app.use('/api/categorias', categorias);
app.use('/api/insumos', insumos);
app.use('/api/clientes', clientes);
app.use('/api/compras', compras);
app.use('/api/detalles_compras', detalles_compras);
app.use('/api/productos', productos);
app.use('/api/ficha_tecnica', fichas_tecnicas);
app.use('/api/ventas', ventas);
app.use('/api/detalles_ventas', detalles_ventas);
app.use('/api/estados', estados);
app.use('/api/clientes_aplicacion', clientes_aplicacion);
app.use('/api/sesiones', sesiones);
app.use('/api/clientes/registro', registro);






module.exports = app;