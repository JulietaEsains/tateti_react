import { useState } from "react";
import Info from "./Info.tsx";
import Board from "./Board.tsx";
import calculateWinner from "../utils/CalculateWinner.ts";

export default function Game() {
    // Estado inicial del juego
    const [cells, setCells] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleCellClick = (i) => {
        const currentCells = cells.slice();

        // No se puede clickear sobre una celda si el juego ha terminado (termina cuando calculateWinner encuentra a un ganador o cuando detecta empate) o si ya tiene texto 
        if (calculateWinner(currentCells) || currentCells[i]) { 
            return;
        }
        
        // Si es posible clickear, se coloca el símbolo en el cuadrado de acuerdo al turno
        currentCells[i] = xIsNext ? 'X' : 'O';

        // Se actualiza el estado del tablero 
        setCells(currentCells);

        // Se cambia de turno
        setXIsNext(!xIsNext)
    }
    
    return (
        <><h1>TA TE TI</h1>
        <div className="game">
            <Info 
                cells = {cells}
                xIsNext = {xIsNext}
            />
            <Board 
                cells = {cells}
                xIsNext = {xIsNext}
                onCellClick = {handleCellClick}
            />
        </div>
        
        { /* Botón para recargar la página, es decir reiniciar el juego */}
        <div className = "reloadContainer">

            <a 
                href = "http://localhost:3000/"
                id = "reload"
            >
                Reiniciar
            </a>

        </div>
        
        </>
    );
}