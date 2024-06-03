import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDate } from "../components/formatDate";
import svg from '../img/bx-left-arrow-alt.svg'

export default function Nota() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [card, setCard] = useState([]);
    const [favorite, setFavorite] = useState("");

    let favorito = favorite == "" ? 1 : 0;

    useEffect(() => {
        const selectCard = async () => {
          try {
            const response = await fetch(`http://localhost:4000/select/${id}`);
            if (!response.ok) {
              throw new Error("Error en la conexión");
            }
            const result = await response.json();
            setCard(result);
            setFavorite(result[0].favorito == 1 ? "favorite" : "");
          } catch (error) {
            console.log(error);
          }
        }
        selectCard();
        
      }, [])
    
    const act = () => {      
      const updateFavorite = async (id, favorito) => {
      try {
        const response = await fetch(`http://localhost:4000/favorite/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ favorito })
        });

        if (!response.ok) {
          throw new Error('Error en la conexión');
        }

        const result = await response.json();
        if (result.message === "updated") {
          setFavorite(favorite == "" ? "favorite" : "");
        }
        
      } catch (error) {
        console.log(error);
      } 
    }

    updateFavorite(id, favorito);
    }

    

    const eliminar = (e) => {
        e.target.parentNode.parentNode.parentNode.remove();

        const deleteCard= async (id) => {
      try {
        const response = await fetch(`http://localhost:4000/delete/${id}`,  {
            method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error en la conexión');
        }

        const result = await response.json();
        
      } catch (error) {
        console.log(error);
      } 
    }
        deleteCard(id);
        navigate('/');
    }

  return (
    <div className="content view">
        <div className="regresar" onClick={() => navigate('/')}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"/></svg><p>Regresar</p></div>
        
        <div className={`card ${favorite}`} style={{ backgroundColor: card.map(e => e.color) }}>
          <div className="mark" onClick={act}>
            ★
          </div>
          <div className="container">
            <h2>{card.map(e => e.titulo)}</h2>
            <p>{card.map(e => e.contenido)}</p>
          </div>
          <div className="footer">
            <p className="date">{formatDate(card.map(e => e.fecha))}</p>
            <div className="buttons">
              <button className="edit" onClick={() => navigate(`/edit/${id}`)}>
                ✎ Editar
              </button>
              <button className="remove" onClick={(e) => eliminar(e)}>
                🗑 Borrar
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
