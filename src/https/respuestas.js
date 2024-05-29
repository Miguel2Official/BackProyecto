
exports.success = function (req, res, data = '', status = 200) {
    res.status(status).send({
        error: false,
        status: status,
        data: data,
    });
};

exports.error = function (req, res, mensaje = 'Error interno', status = 500, error = null) {
    console.error(error); // Imprimir el error en la consola para facilitar el diagnóstico
    res.status(status).send({
        error: true,
        status: status,
        body: mensaje,
        details: error ? error.message : null, // Agregar detalles del error si está presente
    });
};
