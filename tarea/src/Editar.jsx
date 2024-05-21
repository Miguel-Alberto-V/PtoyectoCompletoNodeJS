import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Editar() {
  const { id } = useParams(); // Obtener el ID del evento de la URL
  const [evento, setEvento] = useState({
    id: '',
    evento: '',
    importancia: ''
  });
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await fetch(`${backendURL}/evento/${id}`); // Endpoint para obtener un evento por su ID
        if (!response.ok) {
          throw new Error('Error al obtener evento');
        }
        const data = await response.json();
        setEvento(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEvento();
  }, [id, backendURL]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEvento({ ...evento, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch(`${backendURL}/actualizar/${evento.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          evento: evento.evento,
          importancia: evento.importancia
        })
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el evento');
      }
      // Aquí puedes manejar la respuesta del backend si es necesario
      console.log('Evento actualizado exitosamente');
      const resJson = await response.json();
    
    // Procesar la respuesta JSON aquí
    if (resJson.redirect) {
    window.location.href = resJson.redirect;
    }
          
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="border p-4 text-center">
        <h1>Editar Evento</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="idEvento">ID del Evento:</label>
            <input type="text" className="form-control" id="idEvento" name="idEvento" value={evento.id} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="evento">Nombre del Evento:</label>
            <input type="text" className="form-control" id="evento" name="evento" value={evento.evento} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="importancia">Importancia:</label>
            <input type="number" className="form-control" id="importancia" name="importancia" value={evento.importancia} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn btn-primary">Aceptar</button>
        </form>
      </div>
    </div>
  );
}
