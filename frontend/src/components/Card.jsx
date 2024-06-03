import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Card({id, color, titulo, text, date, favoritoC}) {



  const navigate = useNavigate();

    const [favorite, useFavorite] = useState(favoritoC);

    let favorito = favorite == "" ? 1 : 0;
    
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
            useFavorite(favorite == "" ? "favorite" : "");
        }
        
      } catch (error) {
        console.log(error);
      } 
    }

    updateFavorite(id, favorito);
    }

    const eliminar = (e) => {
        e.target.parentNode.parentNode.parentNode.parentNode.remove();

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
    }

    return (
      <div className="content-Card">
        <div className={`card ${favorite}`} style={{ backgroundColor: color }}>
          <div className="mark" onClick={act}>
            ★
          </div>
          <div className="container">
            <h2>{titulo}</h2>
            <p className="ellipsis">{text}</p>
          </div>
          <div className="footer">
            <p className="date">{date}</p>
            <div className="buttons">
              <button
                className="view"
                onClick={() => navigate(`/view/${id}`)}
              >
                Ver más
              </button>
              <button className="edit" onClick={() => navigate(`/edit/${id}`)}>
                ✎
              </button>
              <button className="remove" onClick={(e) => eliminar(e)}>
                🗑
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  