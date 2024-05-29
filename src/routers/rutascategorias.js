const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/categorias');
//const { todosRegistros } = require('../../DB/consultaDB');

const router = express.Router();

// Manejo de errores para eliminar un categoria_insumos
router.delete('/:id', async (req, res) => {
    try {
        const categoria_insumos = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, categoria_insumos, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar el categoria_insumos', 500, error);
    }
});

// Manejo de errores para actualizar un categoria_insumos
router.put('/:id', async (req, res) => {
    try {
        const categoria_insumos = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, categoria_insumos, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar el categoria_insumos', 500, error);
    }
});

// Manejo de errores para crear un categoria_insumos
router.post('/', async (req, res) => {
    try {
        const categorias_insumos = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, categorias_insumos, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear el categoria_insumos', 500, error);
    }
});

// Manejo de errores para obtener todos los categorias_insumos
router.get('/', async (req, res) => {
    try {
        const categorias_insumos = await controlador.todos();
        respuesta.success(req, res, categorias_insumos, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener los categorias_insumos', 500, error);
    }
});

// Manejo de errores para obtener un categoria_insumos por su ID
router.get('/:id', async (req, res) => {
    try {
        const categoria_insumos = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, categoria_insumos, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener el categoria_insumos', 500, error);
    }
});




module.exports = router;