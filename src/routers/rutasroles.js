const express = require('express');
const respuesta = require('../https/respuestas');
const controlador = require('../controller/roles');

const router = express.Router();

// Manejo de errores para eliminar un rol
router.delete('/:id', async (req, res) => {
    try {
        const rol = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, rol, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar el rol', 500, error);
    }
});

// Manejo de errores para actualizar un rol
router.put('/:id', async (req, res) => {
    try {
        const rol = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, rol, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar el rol', 500, error);
    }
});

// Manejo de errores para crear un rol
router.post('/', async (req, res) => {
    try {
        const nuevoUsuario = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, nuevoUsuario, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear el rol', 500, error);
    }
});

// Manejo de errores para obtener todos los roles
router.get('/', async (req, res) => {
    try {
        const roles = await controlador.todos();
        respuesta.success(req, res, roles, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener los roles', 500, error);
    }
});

// Manejo de errores para obtener un rol por su ID
router.get('/:id', async (req, res) => {
    try {
        const rol = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, rol, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener el rol', 500, error);
    }
});

module.exports = router;
