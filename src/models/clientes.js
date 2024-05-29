const conexion = require('./consultaDB');

function buscarClientePorEmailYPassword(email, password) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM clientes WHERE  email = ? AND password = ?', [email, password], (error, resultados) => {
            if (error) {
                reject(error);
            } else {
                resolve(resultados[0]);
            }
        });
    });
}

function obtenerClientePorUsuario(email) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `SELECT * FROM clientes WHERE email = ?`,
        [email],
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

function insertarCliente(nombre_cliente,direccion,telefono,email, password) {
    return new Promise((resolve, reject) => {
        if (!password) {  // Corrige aquí para usar 'password'
            reject(new Error('La password no puede ser nula'));
            return;
        }
        
        conexion.query('INSERT INTO clientes (nombre_cliente,direccion,telefono, email, password) VALUES (?, ?, ?, ?, ?)', [nombre_cliente, direccion, telefono, email, password], (error, resultado) => {
            if (error) {
                reject(error);
            } else {
                resolve(resultado);
            }
        });
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
        conexion.query(`SELECT * FROM ${tabla} WHERE id_cliente = ${id}`, (error, resultado) => {
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
        conexion.query(`UPDATE ${tabla} SET ? WHERE id_cliente = ?`, [params, id], (error, resultado) => {
            return error ? reject(error): resolve(resultado);
        });
    });
    
}

function eliminarRegistro(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id_cliente = ? ` , id,  (error, resultado) => {
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
    insertarCliente,
    buscarClientePorEmailYPassword,
    obtenerClientePorUsuario
};
