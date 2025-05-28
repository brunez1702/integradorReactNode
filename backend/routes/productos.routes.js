const express = require('express');
const router = express.Router();
const controlador = require('../controllers/productos.controllers');

router.get('/', controlador.obtenerProductos);
router.post('/', controlador.agregarProducto);
router.put('/:id', controlador.actualizarProducto);
router.delete('/:id', controlador.eliminarProducto);

module.exports = router;
