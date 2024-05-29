const db = require('../models/rol_permiso');

const tabla = 'rol_permiso';

function todos() {
    return db.todosRegistros(tabla);
}



module.exports = {
    todos
   
}