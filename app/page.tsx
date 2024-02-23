"use client"; // Página o componente en Next.js""
import React, { useState } from 'react';
import axios from 'axios';

const Pregunta = () => {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [respondiendo, setRespondiendo] = useState(false);
  const [respuestasAnteriores, setRespuestasAnteriores] = useState<string[]>([]);

  const handlePreguntaSubmit = async () => {
    try {
      setRespondiendo(true);
      const response = await axios.post<{ respuesta: string }>('https://fss671f1-3001.brs.devtunnels.ms/preguntar', { pregunta });
      if (response.data && response.data.respuesta) {
        const respuestaJSON: string = response.data.respuesta;
        const respuestaArray: string[] = respuestaJSON.split("\n").filter(item => item.trim().length > 0);
        const textoRespuesta: string = respuestaArray.map(item => JSON.parse(item).response).join("");
        setRespuesta(textoRespuesta);
        setRespuestasAnteriores(prevRespuestas => [...prevRespuestas, textoRespuesta]);
      } else {
        console.error('Error: Respuesta no encontrada en el formato esperado.');
      }
    } catch (error) {
      console.error('Error al obtener respuesta:', error);
    } finally {
      setRespondiendo(false);
    }
  };

  const handleVerAnteriores = () => {
    // Aquí puedes implementar la lógica para mostrar las respuestas anteriores, por ejemplo, en un modal.
    console.log("Mostrar respuestas anteriores:", respuestasAnteriores);
  };


  return (
    <div>
      <input type="text" value={pregunta} onChange={(e) => setPregunta(e.target.value)} />
      <button disabled={respondiendo} onClick={handlePreguntaSubmit}>
        {respondiendo ? 'Respondiendo...' : 'Enviar pregunta'}
      </button>
      <button onClick={handleVerAnteriores}>Ver Respuestas Anteriores</button>
      {respuesta && <div>UpdsGo:  {respuesta}</div>}
    </div>
  );
};

export default Pregunta;
