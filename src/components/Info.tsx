// Muestra los nombres de los jugadores y el estado del juego

import { useEffect, useState } from "react";
import calculateWinner from "../utils/CalculateWinner.ts";
import Player from "./Player.tsx";

export default function Info(props) {
    // Info inicial
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

    // Actualiza el estado del juego
    useEffect(() => {
        let newStatus;

        // En cada renderización averiguamos si alguien ganó, si hay empate o si se sigue jugando
        const winner = calculateWinner(props.cells);

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
            newStatus = 'Próximo jugador: ' + (props.xIsNext ? 'X (' + nameX + ')' : 'O (' + nameO + ')');
        }

        setStatus(newStatus);
    });

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