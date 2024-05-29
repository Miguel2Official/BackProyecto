const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/clientes');
const controladorClientes = require('../controller/clientes');
const { generarToken } = require('../middleware/auth');
//const { todosRegistros } = require('../../DB/consultaDB');

const router = express.Router();


router.post('/registro', async (req, res) => {
    try {
      const {nombre_cliente,direccion, telefono, email, password } = req.body;
      const resultado = await controladorClientes.registrarCliente(nombre_cliente,direccion,telefono, email, password);
      respuesta.success(req, res, resultado, 201);
    } catch (error) {
      respuesta.error(req, res, 'Error al registrar el cliente', 500, error);
    }
  });

// Ruta para iniciar sesión

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const cliente = await controladorClientes.iniciarSesion(email, password);
        if (cliente) {
            // Generar token JWT
            const token = generarToken({ id: cliente.id_cliente });

            // Iniciar sesión exitoso
            respuesta.success(req, res, { cliente, token }, 200);
        } else {
            // Credenciales inválidas
            respuesta.error(req, res, 'Credenciales inválidas', 401);
        }
    } catch (error) {
        respuesta.error(req, res, 'Error al iniciar sesión', 500, error);
    }
})

// Manejo de errores para eliminar un cliente

router.delete('/:id', async (req, res) => {
    try {
        const cliente = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, cliente, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar el cliente', 500, error);
    }
});

// Manejo de errores para actualizar un cliente
router.put('/:id', async (req, res) => {
    try {
        const cliente = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, cliente, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar el cliente', 500, error);
    }
});

// Manejo de errores para crear un cliente

router.post('/', async (req, res) => {
    try {
        const nuevoCliente = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, nuevoCliente, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear el cliente', 500, error);
    }
});

// Manejo de errores para obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await controlador.todos();
        respuesta.success(req, res, clientes, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener los clientes', 500, error);
    }
});

// Manejo de errores para obtener un cliente por su ID
router.get('/:id', async (req, res) => {
    try {
        const cliente = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, cliente, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener el cliente', 500, error);
    }
});

module.exports = router;