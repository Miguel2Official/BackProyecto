const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
};

let conexion;

function conexionDB () {
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((error) => {
        if (error) {
            console.log('[Error en la conexión a la base de datos]', error);
            setTimeout(conexionDB, 2000);
            
        }else{
        console.log('Conexión a la base de datos exitosa');
        }
    });

    conexion.on('error', (error) => {
        console.log('[Error en la conexión a la base de datos]', error);
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            conexionDB();
        } else {
            throw error;
        }
    });
}
conexionDB();

module.exports = conexion;