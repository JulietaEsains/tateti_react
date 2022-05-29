// Tablero

import { useEffect, useState } from "react";
import calculateWinner from "../utils/CalculateWinner.ts";
import Cell from "./Cell.tsx";
import Player from "./Player.tsx";

export default function Board(props) {
    // Estado inicial del juego
    const [cells, setCells] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [nameX, setNameX] = useState('');
    const [nameO, setNameO] = useState('');
    const [status, setStatus] = useState('');

    // Cambio en los input de cada jugador
    const handleXChange = (event) => {
        setNameX(event.target.value); 
    } 
    const handleOChange = (event) => {
        setNameO(event.target.value); 
    } 

    useEffect(() => {
        let newStatus;

        // En cada renderización averiguamos si alguien ganó, si hay empate o si se sigue jugando
        const winner = calculateWinner(cells);

        // Si el juego ha terminado
        if (winner) {
            // Si el ganador es X, muestra "Ganador: X (nombreX)"
            if (winner === 'X') {
                newStatus = 'Ganador: X ('+ nameX +')'
            } else if (winner === 'O') {
                // Si el ganador es O, muestra "Ganador: O (nombreO)"
                newStatus = 'Ganador: O ('+ nameO +')'
            } else newStatus = 'Ganador: '+ winner;
        } else {
            // Si es el turno de X, muestra "Próximo jugador: X (nombreX)", sino "Próximo jugador: O (nombreO)"
            newStatus = 'Próximo jugador: ' + (xIsNext ? 'X (' + nameX + ')' : 'O (' + nameO + ')');
        }

        setStatus(newStatus);
    });

    const handleClick = (i) => {
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

    // Renderiza cada celda
    const renderCell = (i) => {
        return (
            <Cell 
                value = {cells[i]}
                onClick = {() => handleClick(i)}
            />
        );
    } 
    
    return (
        <div>
            <div>
            <div className = "players">
                <form autoComplete = "off">
                    <label>
                        Nombre del jugador X:
                        <Player
                            name = "nameX"
                            value = {nameX}
                            onChange = {handleXChange}
                        />
                    </label>
                    <br />
                    <label>
                        Nombre del jugador O:
                        <Player
                            name = "nameO"
                            value = {nameO}
                            onChange = {handleOChange}
                        />
                    </label>
                </form>
            </div>
            <div className = "status">
                {status}
            </div>
        </div>
            <div className = "board-row">
                {renderCell(0)}
                {renderCell(1)}
                {renderCell(2)}
            </div>
            <div className = "board-row">
                {renderCell(3)}
                {renderCell(4)}
                {renderCell(5)}
            </div>
            <div className = "board-row">
                {renderCell(6)}
                {renderCell(7)}
                {renderCell(8)}
            </div>
        </div>
    );
}