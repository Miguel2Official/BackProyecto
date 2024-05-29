const db = require('../models/clientes');

const tabla = 'clientes';

async function registrarCliente(nombre_cliente,direccion, telefono, email, password) {
    try {
      const resultado = await db.insertarCliente(nombre_cliente,direccion, telefono, email, password);
      return resultado;
    } catch (error) {
      throw error;
    }
  }

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
    registrarCliente,
    iniciarSesion,
}