const conexion = require('./consultaDB');



function obtenerClientePorUsuario(usuario) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `SELECT * FROM clientes_aplicacion WHERE usuario = ?`,
        [usuario],
        (error, resultado) => {
          if (error) return reject(error);
          if (resultado.length > 0) {
            resolve(resultado[0]);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

function todosRegistros(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, resultado) => {
            if (error) return reject(error);
            resolve(resultado);
        });
    });
}

function unRegistro(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_cliente_aplicacion = ${id}`, (error, resultado) => {
            return error ? reject(error): resolve(resultado);
        });
    });
    
}

function insertarRegistro(tabla, datos) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, datos, (error, resultado) => {
            return error ? reject(error): resolve(resultado);
        });
    });
    
}

function actualizarRegistro(tabla, id, params) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id_cliente_aplicacion = ?`, [params, id], (error, resultado) => {
            return error ? reject(error): resolve(resultado);
        });
    });
    
}

function eliminarRegistro(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id_cliente_aplicacion = ? ` , id,  (error, resultado) => {
            return error ? reject(error): resolve(resultado);
        });
    });
    
}

module.exports = { 
    todosRegistros,
    unRegistro,
    insertarRegistro,
    actualizarRegistro,
    eliminarRegistro,
    obtenerClientePorUsuario
 };