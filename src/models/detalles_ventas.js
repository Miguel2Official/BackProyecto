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
        conexion.query(`SELECT * FROM ${tabla} WHERE id_detalle_venta = ${id}`, (error, resultado) => {
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

            // Obtener el último id_venta
            const ultimaVenta = await new Promise((resolve, reject) => {
                conexion.query('SELECT id_venta FROM ventas ORDER BY id_venta DESC LIMIT 1', (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0]);
                });
            });

            const idVenta = ultimaVenta.id_venta;
            datos.id_venta = idVenta;

            // Insertar registro en la tabla detalles_ventas
            const resultado = await new Promise((resolve, reject) => {
                conexion.query(`INSERT INTO ${tabla} SET ?`, datos, (error, resultado) => {
                    return error ? reject(error) : resolve(resultado);
                });
            });

            const idProducto = datos.id_producto;
            const cantidadVendida = datos.cantidad;

            // Obtener los insumos necesarios para el producto vendido
            const insumosNecesarios = await new Promise((resolve, reject) => {
                conexion.query(
                    'SELECT id_insumo, cantidad_insumo FROM ficha_tecnica_insumos WHERE id_producto = ?',
                    [idProducto],
                    (err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    }
                );
            });

            for (const insumo of insumosNecesarios) {
                const idInsumo = insumo.id_insumo;
                const cantidadNecesaria = insumo.cantidad_insumo * cantidadVendida;

                // Descontar el insumo del inventario
                await new Promise((resolve, reject) => {
                    conexion.query(
                        'UPDATE insumos SET stock_actual = stock_actual - ? WHERE id_insumo = ?',
                        [cantidadNecesaria, idInsumo],
                        (err, results) => {
                            if (err) return reject(err);
                            resolve(results);
                        }
                    );
                });
            }

            // Confirmar la transacción
            await new Promise((resolve, reject) => {
                conexion.commit((err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            console.log("Detalle de venta registrado y todos los insumos descontados correctamente.");
            resolve(resultado);
        } catch (err) {
            // Revertir la transacción en caso de error
            await new Promise((resolve, reject) => {
                conexion.rollback((err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            console.error("Error al registrar el detalle de venta:", err.message);
            reject(err);
        }
    });
}

function actualizarRegistro(tabla, id, params) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id_detalle_venta = ?`, [params, id], (error, resultado) => {
            return error ? reject(error) : resolve(resultado);
        });
    });
}

function eliminarRegistro(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id_detalle_venta = ? `, id, (error, resultado) => {
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
