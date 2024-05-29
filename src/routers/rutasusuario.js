const express = require('express');
const respuesta = require('../https/respuestas');
const controlador = require('../controller/usuario');
const { generarToken } = require('../middleware/auth');

const router = express.Router();

// Ruta para registrar un usuario

router.post('/registro', async (req, res) => {
    try {
        const { nombre_usuario, email, password ,id_rol } = req.body;
        const resultado = await controlador.registrarUsuario(nombre_usuario, email, password,id_rol);
        respuesta.success(req, res, resultado, 201);
    } catch (error) {
        respuesta.error(req, res, 'Error al registrar el usuario', 500, error);
    }
});


// Ruta para iniciar sesión

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const cliente = await controlador.iniciarSesion(email, password);
        if (cliente) {
            // Generar token JWT
            const token = generarToken({ id: cliente.id_usuario });

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



// Manejo de errores para eliminar un email
router.delete('/:id', async (req, res) => {
    try {
        const email = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, email, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar el email', 500, error);
    }
});

// Manejo de errores para actualizar un email
router.put('/:id', async (req, res) => {
    try {
        const email = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, email, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar el email', 500, error);
    }
});

// Manejo de errores para crear un email
router.post('/', async (req, res) => {
    try {
        const nuevoUsuario = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, nuevoUsuario, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear el email', 500, error);
    }
});

// Manejo de errores para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await controlador.todos();
        respuesta.success(req, res, usuarios, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener los usuarios', 500, error);
    }
});

// Manejo de errores para obtener un email por su ID
router.get('/:id', async (req, res) => {
    try {
        const email = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, email, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener el email', 500, error);
    }
});

module.exports = router;
