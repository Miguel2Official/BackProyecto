const db = require('../models/cliente_aplicacion');


async function iniciarSesion(usuario, password) {
  try {
    const cliente = await db.obtenerClientePorUsuario(usuario);
    if (cliente && cliente.password === password) {
      // Credenciales válidas
      return cliente;
    } else {
      // Credenciales inválidas
      return null;
    }
  } catch (error) {
    throw error;
  }
}


const tabla = 'clientes_aplicacion';

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
    eliminarRegistro,
    iniciarSesion,
}