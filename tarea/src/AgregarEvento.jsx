import React from 'react';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AgregarEvento()  {
    const [evento, setEvento] = useState('');
    const [importancia, setImportancia] = useState('');
    const backendURL = process.env.REACT_APP_BACKEND_URL;


    const hanndleinsert = async (e) => {
        e.preventDefault();
        const data = {
          evento: evento,
          importancia: importancia,
        }
    
        try {
          const response = await fetch(`${backendURL}/crear`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
    
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
    
          const resJson = await response.json();
    
          // Procesar la respuesta JSON aquí
          if (resJson.redirect) {
            window.location.href = resJson.redirect;
          }
          
          console.log(data)
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
    return (
      <div className="container mt-5">
        <div className="border p-4 text-center">
          <h1>Agregar Nuevo Evento</h1>
          <form >
            <div className="form-group">
              <label htmlFor="idEvento">ID del Evento:</label>
              <input
                type="text"
                className="form-control"
                id="idEvento"
                name="idEvento"
                 // Genera un ID aleatorio (esto se generará automáticamente en el backend)
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="nombreEvento">Nombre del Evento:</label>
              <input
              onChange={(event) => {setEvento(event.target.value)}}
                type="text"
                className="form-control"
                id="nombreEvento"
                name="nombreEvento"
                autoComplete="email"
                    required
            
              />
            </div>
            <div className="form-group">
              <label htmlFor="importancia">Importancia:</label>
              <input
                onChange={(event) => {setImportancia(event.target.value)}}
                required
                type="number"
                className="form-control"
                id="importancia"
                name="importancia"
                
              />
            </div>
            <button onClick={hanndleinsert} type="submit" className="btn btn-primary">Aceptar</button>
          </form>
        </div>
      </div>
    );
}
