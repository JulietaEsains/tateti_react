import { useEffect, useState } from "react";
import calculateWinner from "../utils/calculateWinner.ts";
import { getCurrentPlayer } from "../utils/gameServices.ts";
import Input from "./Input.tsx";

export default function Info(props) {
    const [status, setStatus] = useState("");
    const [playerXId, setPlayerXId] = useState("");
    const [playerOId, setPlayerOId] = useState("");
    const [playerXUsername, setPlayerXUsername] = useState("en espera");
    const [playerOUsername, setPlayerOUsername] = useState("en espera");

    const currentGame = JSON.parse(localStorage.getItem("game") || "{}")

    useEffect(() => {
        let newStatus;
        
        setPlayerXId(currentGame.game.player_x_id)
        setPlayerOId(currentGame.game.player_o_id)

        if (playerXId) {
            getCurrentPlayer(playerXId).then(function (response) {
                setPlayerXUsername(response.user.username);
            });
        } 

        if (playerOId) {
            getCurrentPlayer(playerOId).then(function (response) {
                setPlayerOUsername(response.user.username);
            });
        }

        // En cada renderización averiguamos si alguien ganó, si hay empate o si se sigue jugando
        const winner = calculateWinner(props.cells);

        // Si el juego ha terminado
        if (winner) {
            // Si el ganador es X, muestra "Ganador: X (nombreX)"
            if (winner === 'X') {
                newStatus = 'Ganador: X ('+ playerXUsername +')'
            } else if (winner === 'O') {
                // Si el ganador es O, muestra "Ganador: O (nombreO)"
                newStatus = 'Ganador: O ('+ playerOUsername +')'
            } else newStatus = 'Ganador: '+ winner;
        } else {
            // Si es el turno de X, muestra "Próximo jugador: X (nombreX)", sino "Próximo jugador: O (nombreO)"
            newStatus = 'Próximo jugador: ' + (props.xIsNext ? 'X (' + playerXUsername + ')' : 'O (' + playerOUsername + ')');
        }

        setStatus(newStatus);
    }, [currentGame, playerXId, playerOId, props, playerXUsername, playerOUsername]); 

    return (
        <div>
            <div className = "info">
                <form autoComplete = "off">
                    <label>
                        Número de partida:
                        <Input
                            name = "gameNumberInput"
                            value = {props.gameNumberInput}
                            onChange = {props.onGameNumberInputChange}
                        />
                 </label>
                </form>
                <div className="current-game">
                    <h3>Partida actual</h3>
                    <p>
                        Número de partida: {props.gameNumberOutput}
                    </p>
                </div>
            </div>
            <div className = "status">
                {status}
            </div>
        </div>
    );
}