import { useEffect, useState } from "react";
import calculateWinner from "../utils/CalculateWinner.ts";
import Input from "./Input.tsx";

export default function Info(props) {
    // Info inicial
    const [name, setName] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [status, setStatus] = useState('');

    // Cambio en los input de cada jugador
    const handleNameChange = (event) => {
        setName(event.target.value); 
    } 
    const handleAccessTokenChange = (event) => {
        setAccessToken(event.target.value); 
    } 

    // Actualiza el estado del juego
    /* useEffect(() => {
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
    }); */

    return (
        <div>
            <div className = "info">
                <form autoComplete = "off">
                    <label>
                        Tu nombre:
                        <Input
                            name = "name"
                            value = {name}
                            onChange = {handleNameChange}
                        />
                    </label>
                    <br />
                    <label>
                        Token de acceso:
                        <Input
                            name = "accessToken"
                            value = {accessToken}
                            onChange = {handleAccessTokenChange}
                        />
                 </label>
                </form>
                <div className="current-game">
                    <h3>Partida actual</h3>
                    <p>Token de acceso:</p>
                </div>
            </div>
            <div className = "status">
                {status}
            </div>
        </div>
    );
}