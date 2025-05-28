import './App.css'
import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import Productos from './components/Productos';
import Usuarios from './components/Usuarios';

function App() {
  return (
    <Container className="mt-4">
    <h1 className="mb-4">Administrador</h1>
    <Tabs defaultActiveKey="productos" id="tab-example">
      <Tab eventKey="productos" title="Productos">
        <Productos />
      </Tab>
      <Tab eventKey="usuarios" title="Usuarios">
        <Usuarios />
      </Tab>
    </Tabs>
  </Container>
  );
}

export default App
