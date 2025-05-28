const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/usuarios.json');

function leerUsuarios() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8') || '[]');
}

function guardarUsuarios(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

exports.obtenerUsuarios = (req, res) => {
  const usuarios = leerUsuarios();
  res.json(usuarios);
};

exports.agregarUsuario = (req, res) => {
  const usuarios = leerUsuarios();
  const nuevo = req.body;
  nuevo.id = Date.now();
  usuarios.push(nuevo);
  guardarUsuarios(usuarios);
  res.status(201).json(nuevo);
};

exports.actualizarUsuario = (req, res) => {
  const { id } = req.params;
  const usuarios = leerUsuarios();
  const index = usuarios.findIndex(u => u.id == id);
  if (index === -1) return res.status(404).json({ mensaje: 'No encontrado' });
  usuarios[index] = { ...usuarios[index], ...req.body };
  guardarUsuarios(usuarios);
  res.json(usuarios[index]);
};

exports.eliminarUsuario = (req, res) => {
  const { id } = req.params;
  let usuarios = leerUsuarios();
  usuarios = usuarios.filter(u => u.id != id);
  guardarUsuarios(usuarios);
  res.json({ mensaje: 'Usuario eliminado' });
};
