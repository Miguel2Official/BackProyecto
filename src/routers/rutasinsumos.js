const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/insumos');
//const { todosRegistros } = require('../../DB/consultaDB');

const router = express.Router();

// Manejo de errores para eliminar un insumo

router.delete('/:id', async (req, res) => {
    try {
        const insumo = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, insumo, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar el insumo', 500, error);
    }
});

// Manejo de errores para actualizar un insumo
router.put('/:id', async (req, res) => {
    try {
        const insumo = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, insumo, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar el insumo', 500, error);
    }
});

// Manejo de errores para crear un insumo

router.post('/', async (req, res) => {
    try {
        const nuevoInsumo = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, nuevoInsumo, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear el insumo', 500, error);
    }
});

// Manejo de errores para obtener todos los insumos
router.get('/', async (req, res) => {
    try {
        const insumos = await controlador.todos();
        respuesta.success(req, res, insumos, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener los insumos', 500, error);
    }
});

// Manejo de errores para obtener un insumo por su ID
router.get('/:id', async (req, res) => {
    try {
        const insumo = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, insumo, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener el insumo', 500, error);
    }
});

module.exports = router;