const express = require('express');
const router = express.Router();
const controlador = require('../controllers/usuarios.controllers');

router.get('/', controlador.obtenerUsuarios);
router.post('/', controlador.agregarUsuario);
router.put('/:id', controlador.actualizarUsuario);
router.delete('/:id', controlador.eliminarUsuario);

module.exports = router;
