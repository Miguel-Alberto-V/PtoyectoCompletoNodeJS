import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AgendaCrud() {
  const [eventos, setEventos] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
 

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch(`${backendURL}/listar`);
        if (!response.ok) {
          console.log('Error al obtener eventos');
        }
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEventos();
  }, [backendURL]);

  const eliminarEvento = async (id) => {
    try {
      const response = await fetch(`${backendURL}/eliminar/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el evento');
      }
      setEventos(eventos.filter(evento => evento.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="border p-4 text-center">
        <h1>Agenda de Miguel</h1>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Evento</th>
              <th>Importancia</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map(evento => (
              <tr key={evento.id}>
                <td>{evento.id}</td>
                <td>{evento.evento}</td>
                <td>{evento.importancia}</td>
                <td>
                  <Link to={`/editar/${evento.id}`} className="btn btn-sm btn-primary mr-2">Editar</Link>
                  <button className="btn btn-sm btn-danger" onClick={() => eliminarEvento(evento.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to='/insertar' className="btn btn-primary">Agregar Nuevo Evento</Link>
      </div>
    </div>
  );
}
