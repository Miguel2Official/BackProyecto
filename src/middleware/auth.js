const jwt = require('jsonwebtoken');
const config = require('../config');

function generarToken(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
}

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.usuario = decoded;
    next();
  });
}

module.exports = { generarToken, verificarToken };