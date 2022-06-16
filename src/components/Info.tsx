import { useEffect, useState } from "react";
import calculateWinner from "../utils/calculateWinner.ts";
import Input from "./Input.tsx";

export default function Info(props) {
    const [status, setStatus] = useState('');
    const [otherPlayersName, setOtherPlayersName] = useState('');

    useEffect(() => {
        let newStatus;

        // En cada renderización averiguamos si alguien ganó, si hay empate o si se sigue jugando
        const winner = calculateWinner(props.cells);

        // Si el juego ha terminado
        if (winner) {
            // Si el ganador es X, muestra "Ganador: X (nombreX)"
            if (winner === 'X') {
                newStatus = 'Ganador: X ('+ 'nameX' +')'
            } else if (winner === 'O') {
                // Si el ganador es O, muestra "Ganador: O (nombreO)"
                newStatus = 'Ganador: O ('+ 'nameO' +')'
            } else newStatus = 'Ganador: '+ winner;
        } else {
            // Si es el turno de X, muestra "Próximo jugador: X (nombreX)", sino "Próximo jugador: O (nombreO)"
            newStatus = 'Próximo jugador: ' + (props.xIsNext ? 'X (' + 'nameX' + ')' : 'O (' + 'nameO' + ')');
        }

        setStatus(newStatus);
    }, []); 

    return (
        <div>
            <div className = "info">
                <form autoComplete = "off">
                    <label>
                        Tu nombre:
                        <Input
                            name = "currentPlayersName"
                            value = {props.currentPlayersName}
                            onChange = {props.onCurrentPlayersNameChange}
                        />
                    </label>
                    <br />
                    <label>
                        Token de acceso:
                        <Input
                            name = "accessTokenInput"
                            value = {props.accessTokenInput}
                            onChange = {props.onAccessTokenInputChange}
                        />
                 </label>
                </form>
                <div className="current-game">
                    <h3>Partida actual</h3>
                    <p>
                        Token de acceso:
                        <br />
                        <br /> 
                        {props.accessTokenOutput}
                    </p>
                </div>
            </div>
            <div className = "status">
                {status}
            </div>
        </div>
    );
}