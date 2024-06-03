import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

export default function UpdateCard() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [color, setColor] = useState('#FE9B72');
    const [card, setCard] = useState([]);

    useEffect(() => {
      const selectCard = async () => {
        try {
          const response = await fetch(`http://localhost:4000/select/${id}`);
          if (!response.ok) {
            throw new Error("Error en la conexión");
          }
          const result = await response.json();
          setCard(result);
          setTitulo(result[0].titulo)
          setContenido(result[0].contenido)
        } catch (error) {
          console.log(error);
        }
      }
      selectCard();
      
    }, [])
      

    const actualizar = (e) => {
        e.preventDefault();

        if (titulo === '') return;
        if (contenido === '') return;
        if (color === '') return;

        const modificarCard = async (id) => {
          try {
            const response = await fetch(`http://localhost:4000/update/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ titulo, contenido, color }),
            });

            if (!response.ok) {
              throw new Error("Error en la conexión");
            }

            const result = await response.json();
          } catch (error) {
            console.log(error);
          }
        };
        modificarCard(id);

        navigate("/");
        window.location.reload();
    } 

  return (
    <form onSubmit={actualizar} className="content">
        <h1>Modificar Nota</h1>
        <div className='addNote'>
            <div className="container">
                <label htmlFor="title">Título</label>
                <input type="text" name="titulo" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            </div>
            
            <div className="container">
                <label htmlFor="content">Contenido</label>
                <textarea name="contenido" id="contenido" cols="30" rows="10" value={contenido} onChange={(e) => setContenido(e.target.value)} required></textarea>
            </div>

            <div className="container">
                <label htmlFor="color">Color</label>
                <div className="inputs">
                    <input type="radio" name="color" id="color1" value={"#FE9B72"} onChange={e => setColor(e.target.value)} defaultChecked />
                    <input type="radio" name="color" id="color2" value={"#E3EF8F"} onChange={e => setColor(e.target.value)} />
                    <input type="radio" name="color" id="color3" value={"#B693FD"} onChange={e => setColor(e.target.value)} />
                    <input type="radio" name="color" id="color4" value={"#00D4FE"} onChange={e => setColor(e.target.value)} /> 
                </div>
            </div>
            
            <div className="buttons">

              <Link to={"/"} className="btnRegresar">Regresar</Link>
              <button type='submit' className='btnCrearNota'>Modificar Nota</button>
            </div>
        </div>
    </form>
  )
}
