const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/proveedores');

const router = express.Router();

// Manejo de errores para eliminar un proveedor
router.delete('/:id', async (req, res) => {
    try {
        const proveedor = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, proveedor, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar el proveedor', 500, error);
    }
});

// Manejo de errores para actualizar un proveedor
router.put('/:id', async (req, res) => {
    try {
        const proveedor = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, proveedor, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar el proveedor', 500, error);
    }
});

// Manejo de errores para crear un proveedor
router.post('/', async (req, res) => {
    try {
        const nuevoProveedor = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, nuevoProveedor, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear el proveedor', 500, error);
    }
});

// Manejo de errores para obtener todos los proveedores
router.get('/', async (req, res) => {
    try {
        const proveedores = await controlador.todos();
        respuesta.success(req, res, proveedores, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener los proveedores', 500, error);
    }
});

// Manejo de errores para obtener un proveedor por su ID
router.get('/:id', async (req, res) => {
    try {
        const proveedor = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, proveedor, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener el proveedor', 500, error);
    }
});





module.exports = router;