import { useState } from "react";
import Board  from "./Board";
import Info from "./Info";

export default function Game() {
    // Se comienza con un arreglo de 9 elementos nulos, que son las celdas
    const [cells, setCells] = useState(Array(9).fill(null));

    // Empieza siendo el turno del jugador X
    const [xIsNext, setXIsNext] = useState(true);

    return (
        <><h1>TA TE TI</h1>
        <div className='game'>

            <Info />

            <div className='board'>
                <Board
                    xIsNext={xIsNext}
                    cells={cells} 
                />
            </div>

        </div>
        
        { /* Botón para recargar la página, es decir reiniciar el juego */}
        <div className = "reloadContainer">

            <a 
                href="http://localhost:3000/"
                id = "reload"
            >
                Reiniciar
            </a>

        </div>
        
        </>
    );
}