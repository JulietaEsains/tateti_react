// Guarda el estado del juego y los nombres de los jugadores

import { useState } from "react";
import calculateWinner from "../utils/CalculateWinner";
import Player from "./Player";

export default function Info(props) {
    // El nombre de cada jugador comienza vacío
    const [nameX, setNameX] = useState('');
    const [nameO, setNameO] = useState('');

    // En cada renderización averiguamos si alguien ganó, si hay empate o si se sigue jugando
    const winner = calculateWinner(props.cells);

    // Informa el estado del juego
    let status;

    // Métodos para manejar el cambio en los input
    const handleXChange = (event) => {
        setNameX(event.target.value); 
    } 

    const handleOChange = (event) => {
        setNameO(event.target.value); 
    } 

    // Si el juego ha terminado
    if (winner) {
        status = 'Ganador: ' + winner;

        // Si el ganador es X, muestra "Ganador: X (nombreX)"
        if (winner === 'X') {
            status += ' ('+ {nameX} +')';
        } else if (winner === 'O') {
            // Si el ganador es O, muestra "Ganador: O (nombreO)"
            status += ' ('+ {nameO} +')';
        }
    } else {
        // Si es el turno de X, muestra "Próximo jugador: X (nombreX)", sino "Próximo jugador: O (nombreO)"
        status = 'Próximo jugador: ' + (props.xIsNext ? 'X (' + {nameX} + ')' : 'O (' + {nameO} + ')');
    }

    return (
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
    );
}