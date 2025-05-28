const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/productos.json');

function leerProductos() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8') || '[]');
}

function guardarProductos(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

exports.obtenerProductos = (req, res) => {
  const productos = leerProductos();
  res.json(productos);
};

exports.agregarProducto = (req, res) => {
  const productos = leerProductos();
  const nuevo = req.body;
  nuevo.id = Date.now();
  productos.push(nuevo);
  guardarProductos(productos);
  res.status(201).json(nuevo);
};

exports.actualizarProducto = (req, res) => {
  const { id } = req.params;
  const productos = leerProductos();
  const index = productos.findIndex(p => p.id == id);
  if (index === -1) return res.status(404).json({ mensaje: 'No encontrado' });
  productos[index] = { ...productos[index], ...req.body };
  guardarProductos(productos);
  res.json(productos[index]);
};

exports.eliminarProducto = (req, res) => {
  const { id } = req.params;
  let productos = leerProductos();
  productos = productos.filter(p => p.id != id);
  guardarProductos(productos);
  res.json({ mensaje: 'Producto eliminado' });
};
