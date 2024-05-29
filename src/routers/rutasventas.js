const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/ventas');
//const { todosRegistros } = require('../../DB/consultaDB');

const router = express.Router();


// Manejo de errores para crear una venta

router.post('/', async (req, res) => {
    try {
        const nuevaVenta = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, nuevaVenta, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear la venta', 500, error);
    }
});

// Manejo de errores para obtener todas las ventas

router.get('/', async (req, res) => {
    try {
        const ventas = await controlador.todos();
        respuesta.success(req, res, ventas, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener las ventas', 500, error);
    }
});

// Manejo de errores para obtener una venta por su ID

router.get('/:id', async (req, res) => {
    try {
        const venta = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, venta, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener la venta', 500, error);
    }
});

module.exports = router;