const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/ficha_tecnica');
//const { todosRegistros } = require('../../DB/consultaDB');

const router = express.Router();

// Manejo de errores para eliminar un detalle de orden de compra

router.delete('/:id', async (req, res) => {
    try {
        const detalle_orden_compra = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, detalle_orden_compra, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar el detalle de orden de compra', 500, error);
    }
});

// Manejo de errores para actualizar un detalle de orden de compra

router.put('/:id', async (req, res) => {
    try {
        const detalle_orden_compra = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, detalle_orden_compra, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar el detalle de orden de compra', 500, error);
    }
});

// Manejo de errores para crear un detalle de orden de compra

router.post('/', async (req, res) => {
    try {
        const nuevoDetalleOrdenCompra = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, nuevoDetalleOrdenCompra, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear el detalle de orden de compra', 500, error);
    }
});

// Manejo de errores para obtener todos los detalles de orden de compra

router.get('/', async (req, res) => {
    try {
        const detalles_orden_compra = await controlador.todos();
        respuesta.success(req, res, detalles_orden_compra, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener los detalles de orden de compra', 500, error);
    }
});

// Manejo de errores para obtener un detalle de orden de compra por su ID

router.get('/:id', async (req, res) => {
    try {
        const detalle_orden_compra = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, detalle_orden_compra, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener el detalle de orden de compra', 500, error);
    }
});

module.exports = router;