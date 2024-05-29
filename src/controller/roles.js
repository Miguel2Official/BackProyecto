const db = require('../models/roles');

const tabla = 'roles';

function todos() {
    return db.todosRegistros(tabla);
}

function unRegistro(id) {
    return db.unRegistro(tabla, id);
}

function insertarRegistro(datos) {
    return db.insertarRegistro(tabla, datos);
}

function actualizarRegistro(id, params) {
    return db.actualizarRegistro(tabla, id, params);
}

function eliminarRegistro(id) {
    return db.eliminarRegistro(tabla, id);
}

module.exports = {
    todos,
    unRegistro,
    insertarRegistro,
    actualizarRegistro,
    eliminarRegistro
}