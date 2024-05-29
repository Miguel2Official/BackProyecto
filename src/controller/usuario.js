const db = require('../models/usuarios');

async function registrarUsuario(nombre_usuario, email, password, id_rol) {
    try {
      const resultado = await db.insertarCliente(nombre_usuario, email, password, id_rol);
      return resultado;
    } catch (error) {
      throw error;
    }
  }
 
async function iniciarSesion(email, password) {
    try {
      const cliente = await db.obtenerUsuarioPorEmail(email);
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

const tabla = 'usuarios';
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
    return db.actualizarRegistro(tabla,id, params);
}



function eliminarRegistro(id) {
    return db.eliminarRegistro(tabla,id);
}

module.exports = {
    todos,
    unRegistro,
    insertarRegistro,
    actualizarRegistro,
    eliminarRegistro,
    iniciarSesion,
    registrarUsuario,

}