const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/detalles_venta');
//const { todosRegistros } = require('../../DB/consultaDB');

const router = express.Router();

// Manejo de errores para eliminar un detalle de orden de compra

router.delete('/:id', async (req, res) => {
    try {
        const detalle_venta = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, detalle_venta, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar venta', 500, error);
    }
});

// Manejo de errores para actualizar un detalle de orden de compra

router.put('/:id', async (req, res) => {
    try {
        const detalle_venta = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, detalle_venta, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar venta', 500, error);
    }
});

// Manejo de errores para crear un detalle de orden de compra

router.post('/', async (req, res) => {
    try {
        const nuevoDetalleVenta = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, nuevoDetalleVenta, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear la venta', 500, error);
    }
});

// Manejo de errores para obtener todos los detalles de orden de compra

router.get('/', async (req, res) => {
    try {
        const detalle_venta = await controlador.todos();
        respuesta.success(req, res, detalle_venta, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener los detalles de la venta', 500, error);
    }
});

// Manejo de errores para obtener un detalle de orden de compra por su ID

router.get('/:id', async (req, res) => {
    try {
        const detalle_venta = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, detalle_venta, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener el detalle de la venta', 500, error);
    }
});

module.exports = router;