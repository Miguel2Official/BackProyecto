const express = require('express');

const respuesta = require('../https/respuestas');
const controlador = require('../controller/rol_permiso');


const router = express.Router();

router.delete('/:id', async (req, res) => {
    try {
        const rol_permiso = await controlador.eliminarRegistro(req.params.id);
        respuesta.success(req, res, rol_permiso, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al eliminar el rol y permiso', 500);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const rol_permiso = await controlador.actualizarRegistro(req.params.id, req.body);
        respuesta.success(req, res, rol_permiso, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al actualizar el rol y permiso', 500);
    }
});

router.post('/', async (req, res) => {
    try {
        const rol_permiso = await controlador.insertarRegistro(req.body);
        respuesta.success(req, res, rol_permiso, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al crear el rol y permiso', 500);
    }
});

router.get('/', async (req, res) => {
    try {
        const rol_permiso = await controlador.todos();
        respuesta.success(req, res, rol_permiso, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener los roles y permiso', 500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const rol_permiso = await controlador.unRegistro(req.params.id);
        respuesta.success(req, res, rol_permiso, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener el rol y permiso', 500);
    }
});





module.exports = router;