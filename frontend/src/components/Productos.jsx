import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const API = 'http://localhost:3001/productos';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const res = await axios.get(API);
    setProductos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }
    setForm({ nombre: '', precio: '' });
    fetchProductos();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchProductos();
  };

  const handleEdit = (producto) => {
    setForm({ nombre: producto.nombre, precio: producto.precio });
    setEditId(producto.id);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Listado de Productos', 14, 10);
    doc.autoTable({
      startY: 20,
      head: [['Nombre', 'Precio']],
      body: productos.map(p => [p.nombre, `$${p.precio}`]),
    });
    doc.save('productos.pdf');
  };
  

  return (
    <div className="mt-3">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col><Form.Control
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          /></Col>
          <Col><Form.Control
            placeholder="Precio"
            type="number"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
          /></Col>
          <Col><Button type="submit">{editId ? 'Actualizar' : 'Agregar'}</Button></Col>
        </Row>
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(p)} className="me-2">Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(p.id)}>Eliminar</Button>
                <Button variant="success" onClick={exportarPDF} className="mt-3">
                    Exportar PDF
                </Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Productos;
