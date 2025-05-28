const express = require('express');
const cors = require('cors');
const app = express();
const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');

app.use(cors());
app.use(express.json());

app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);

app.listen(3001, () => {
  console.log('Servidor backend corriendo en http://localhost:3001');
});
