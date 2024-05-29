const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/cliente_aplicacion');
const controladorClientes = require('../controller/cliente_aplicacion');
const { generarToken } = require('../middleware/auth');
//const { todosRegistros } = require('../../DB/consultaDB');

const router = express.Router();



// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const cliente = await controladorClientes.iniciarSesion(usuario, password);
    if (cliente) {
      // Generar token JWT
      const token = generarToken({ id: cliente.id_cliente_aplicacion });

      // Iniciar sesión exitoso
      respuesta.success(req, res, { cliente, token }, 200);
    } else {
      // Credenciales inválidas
      respuesta.error(req, res, 'Credenciales inválidas', 401);
    }
  } catch (error) {
    respuesta.error(req, res, 'Error al iniciar sesión', 500, error);
  }
});

// Manejo de errores para eliminar un cliente_aplicacion

router.delete('/:id', async (req, res) => {
    try {
        const cliente_aplicacion = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, cliente_aplicacion, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar el cliente_aplicacion', 500, error);
    }
});

// Manejo de errores para actualizar un cliente_aplicacion

router.put('/:id', async (req, res) => {
    try {
        const cliente_aplicacion = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, cliente_aplicacion, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar el cliente_aplicacion', 500, error);
    }
});

// Manejo de errores para crear un cliente_aplicacion

router.post('/', async (req, res) => {
    try {
        const clientes_aplicacion = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, clientes_aplicacion, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear el cliente_aplicacion', 500, error);
    }
});

// Manejo de errores para obtener todos los clientes_aplicacion

router.get('/', async (req, res) => {
    try {
        const clientes_aplicacion = await controlador.todos();
        respuesta.success(req, res, clientes_aplicacion, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener los clientes_aplicacion', 500, error);
    }
});

// Manejo de errores para obtener un cliente_aplicacion por su ID

router.get('/:id', async (req, res) => {
    try {
        const cliente_aplicacion = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, cliente_aplicacion, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener el cliente_aplicacion', 500, error);
    }
});



module.exports = router;