const conexion = require('./consultaDB');

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
        conexion.query(`SELECT * FROM ${tabla} WHERE id_detalle_compra = ${id}`, (error, resultado) => {
            return error ? reject(error) : resolve(resultado);
        });
    });
}

function insertarRegistro(tabla, datos) {
    return new Promise(async (resolve, reject) => {
        try {
            // Iniciar una transacción
            await new Promise((resolve, reject) => {
                conexion.beginTransaction((err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            // Obtener el último id_compra
            const ultimaCompra = await new Promise((resolve, reject) => {
                conexion.query('SELECT id_compra FROM compras ORDER BY id_compra DESC LIMIT 1', (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0]);
                });
            });

            const idCompra = ultimaCompra.id_compra;
            datos.id_compra = idCompra;

            // Insertar registro en la tabla detalles_compras
            const resultado = await new Promise((resolve, reject) => {
                conexion.query(`INSERT INTO ${tabla} SET ?`, datos, (error, resultado) => {
                    return error ? reject(error) : resolve(resultado);
                });
            });

            const idInsumo = datos.id_insumo;
            const cantidadComprada = datos.cantidad;

            // Incrementar el insumo en el inventario
            await new Promise((resolve, reject) => {
                conexion.query(
                    'UPDATE insumos SET stock_actual = stock_actual + ? WHERE id_insumo = ?',
                    [cantidadComprada, idInsumo],
                    (err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    }
                );
            });

            // Confirmar la transacción
            await new Promise((resolve, reject) => {
                conexion.commit((err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            console.log("Detalle de compra registrado y stock de insumos incrementado correctamente.");
            resolve(resultado);
        } catch (err) {
            // Revertir la transacción en caso de error
            await new Promise((resolve, reject) => {
                conexion.rollback((err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            console.error("Error al registrar el detalle de compra:", err.message);
            reject(err);
        }
    });
}

function actualizarRegistro(tabla, id, params) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id_detalle_compra = ?`, [params, id], (error, resultado) => {
            return error ? reject(error) : resolve(resultado);
        });
    });
}

function eliminarRegistro(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id_detalle_compra = ? `, id, (error, resultado) => {
            return error ? reject(error) : resolve(resultado);
        });
    });
}

module.exports = {
    todosRegistros,
    unRegistro,
    insertarRegistro,
    actualizarRegistro,
    eliminarRegistro
};
