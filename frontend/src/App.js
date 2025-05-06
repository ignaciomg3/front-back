import React, { useState } from 'react';

function App() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:5000/api/calculate-age', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formulario)
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        setMensaje(data.mensaje);
      } else {
        setMensaje(data.error || 'Ocurrió un error');
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
    }
  };

  //DESDE ACA
  const exportarExcel = async () => {
    const respuesta = await fetch('http://localhost:5000/api/export-excel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: formulario.nombre,
        apellido: formulario.apellido,
        fechaNacimiento: formulario.fechaNacimiento
      })
    });
  
    const blob = await respuesta.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datos_usuario.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();

    //hasta ACA
  };
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Formulario de Edad</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre: </label>
          <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label>Apellido: </label>
          <input type="text" name="apellido" value={formulario.apellido} onChange={handleChange} required />
        </div>
        <div>
          <label>Fecha de nacimiento: </label>
          <input type="date" name="fechaNacimiento" value={formulario.fechaNacimiento} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Enviar</button>
      </form>

      {mensaje && (
        <div style={{ marginTop: '2rem', fontWeight: 'bold' }}>
          {mensaje}
        </div>
      )}

      <button onClick={exportarExcel}>Exportar a Excel</button>
      

    </div>
  );
}

export default App;
