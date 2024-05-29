const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/estados');
//const { todosRegistros } = require('../../DB/consultaDB');

const router = express.Router();

// Manejo de errores para eliminar un estados

router.delete('/:id', async (req, res) => {
    try {
        const estados = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, estados, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar el estados', 500, error);
    }
});

// Manejo de errores para actualizar un estados

router.put('/:id', async (req, res) => {
    try {
        const estados = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, estados, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar el estados', 500, error);
    }
});

// Manejo de errores para crear un estados

router.post('/', async (req, res) => {
    try {
        const nuevoEstado = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, nuevoEstado, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear el estados', 500, error);
    }
});

// Manejo de errores para obtener todos los estados

router.get('/', async (req, res) => {
    try {
        const estados = await controlador.todos();
        respuesta.success(req, res, estados, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener los estados', 500, error);
    }
});

// Manejo de errores para obtener un estados por su ID

router.get('/:id', async (req, res) => {
    try {
        const estados = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, estados, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener el estados', 500, error);
    }
});

module.exports = router;