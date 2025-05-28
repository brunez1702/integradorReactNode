import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from "jspdf";
import "jspdf-autotable";


const API = 'http://localhost:3001/usuarios';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: '', email: '' , edad: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const res = await axios.get(API);
    setUsuarios(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }
    setForm({ nombre: '', email: '' , edad: '' });
    fetchUsuarios();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsuarios();
  };

  const handleEdit = (usuario) => {
    setForm({ nombre: usuario.nombre, email: usuario.email, edad: usuario.edad });
    setEditId(usuario.id);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Listado de Usuarios', 14, 10);
    doc.autoTable({
      startY: 20,
      head: [['Nombre', 'Email', 'Edad']],
      body: usuarios.map(u => [u.nombre, u.email, u.edad]),
    });
    doc.save('usuarios.pdf');
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
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          /></Col>
          <Col><Form.Control
            placeholder="Edad"
            type="number"
            value={form.edad}
            onChange={(e) => setForm({ ...form, edad: e.target.value })}
          /></Col>
          <Col><Button type="submit">{editId ? 'Actualizar' : 'Agregar'}</Button></Col>
        </Row>
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.email}</td>
              <td>{p.edad}</td>
              <td>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                    <Button variant="warning" onClick={() => handleEdit(p)} className="me-2">Editar</Button>
                    <Button variant="danger" onClick={() => handleDelete(p.id)}>Eliminar</Button>
                </div>
                <Button variant="success" onClick={exportarPDF} className="mt-3">
                    Exportar PDF
                </Button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Usuarios;
