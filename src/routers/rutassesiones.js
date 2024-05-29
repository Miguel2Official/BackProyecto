const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/sesiones');
//const { todosRegistros } = require('../../DB/consultaDB');

const router = express.Router();

// Manejo de errores para eliminar sesiones

router.delete('/:id', async (req, res) => {
    try {
        const categoria = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, categoria, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar sesiones', 500, error);
    }
});

// Manejo de errores para actualizar sesiones

router.put('/:id', async (req, res) => {
    try {
        const categoria = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, categoria, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar sesiones', 500, error);
    }
});

// Manejo de errores para crear sesiones

router.post('/', async (req, res) => {
    try {
        const categorias = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, categorias, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear sesiones', 500, error);
    }
});

// Manejo de errores para obtener todos los sesiones

router.get('/', async (req, res) => {
    try {
        const categorias = await controlador.todos();
        respuesta.success(req, res, categorias, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener las sesiones', 500, error);
    }
});

// Manejo de errores para obtener una sesion por su ID

router.get('/:id', async (req, res) => {
    try {
        const categoria = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, categoria, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener la sesion', 500, error);
    }
});

module.exports = router;