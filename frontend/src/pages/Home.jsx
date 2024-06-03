import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { formatDate } from '../components/formatDate';

export default function Home() {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [check, setCheck] = useState(false);



  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/");
      if (!response.ok) {
        throw new Error("Error en la conexión");
      }
      const result = await response.json();
      setNotes(result);
      
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    fetchData();
  }, [check])

  if (loading) return (
    <div className='content loading'>
      <h1>CARGANDO...  {notes}</h1>
    </div>
  )

  if (error) return (
    <div className='content loading'>
      <h1>{error.message}</h1>
    </div>
  )

  const notasFinal = () => {

    if (check) return notes.filter((e) => e.favorito == 1);
    else return notes;

  };

  return (
    <div className="content">
      <div className="header">
        <h1>Notas</h1>

        <button className="filter" onClick={() => {setCheck(!check)}}>
          <div className={`cuadro ${check ? 'active' : ''}`}></div>
          Mostrar solo favoritos
        </button>
      </div>

      <div className="cards">
        {notasFinal().map((e) => (
          <Card
            key={e.id}
            id={e.id}
            titulo={e.titulo}
            text={e.contenido}
            date={formatDate(e.fecha)}
            color={e.color}
            favoritoC={e.favorito == 0 ? "" : "favorite"}
          />
        ))}
      </div>
    </div>
  );
}
