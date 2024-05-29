const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/compra');
//const { todosRegistros } = require('../../DB/consultaDB');

const router = express.Router();

// Manejo de errores para eliminar una orden de compra 

router.delete('/:id', async (req, res) => {
    try {
        const orden_compra = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, orden_compra, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar la orden de compra', 500, error);
    }
});

// Manejo de errores para actualizar una orden de compra
router.put('/:id', async (req, res) => {
    try {
        const orden_compra = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, orden_compra, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar la orden de compra', 500, error);
    }
});

// Manejo de errores para crear una orden de compra

router.post('/', async (req, res) => {
    try {
        const nuevaOrdenCompra = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, nuevaOrdenCompra, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear la orden de compra', 500, error);
    }
});

// Manejo de errores para obtener todas las ordenes de compra
router.get('/', async (req, res) => {
    try {
        const ordenes_compra = await controlador.todos();
        respuesta.success(req, res, ordenes_compra, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener las ordenes de compra', 500, error);
    }
});

// Manejo de errores para obtener una orden de compra por su ID
router.get('/:id', async (req, res) => {
    try {
        const orden_compra = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, orden_compra, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener la orden de compra', 500, error);
    }
});

module.exports = router;