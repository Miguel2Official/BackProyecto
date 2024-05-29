const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/permisos');
//const { todosRegistros } = require('../../DB/consultaDB');

const router = express.Router();

// Manejo de errores para eliminar un permiso
router.delete('/:id', async (req, res) => {
    try {
        const permiso = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, permiso, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar el permiso', 500, error);
    }
});

// Manejo de errores para actualizar un permiso
router.put('/:id', async (req, res) => {
    try {
        const permiso = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, permiso, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar el permiso', 500, error);
    }
});

// Manejo de errores para crear un permiso
router.post('/', async (req, res) => {
    try {
        const nuevoPermiso = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, nuevoPermiso, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear el permiso', 500, error);
    }
});

// Manejo de errores para obtener todos los permisos
router.get('/', async (req, res) => {
    try {
        const permisos = await controlador.todos();
        respuesta.success(req, res, permisos, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener los permisos', 500, error);
    }
});

// Manejo de errores para obtener un permiso por su ID
router.get('/:id', async (req, res) => {
    try {
        const permiso = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, permiso, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener el permiso', 500, error);
    }
});




module.exports = router;