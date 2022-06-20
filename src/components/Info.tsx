import { useEffect, useState } from "react";
import calculateWinner from "../utils/calculateWinner.ts";
import { getCurrentGame, getPlayer } from "../utils/gameServices.ts";
import Input from "./Input.tsx";

export default function Info(props) {
    const [status, setStatus] = useState("");
    const [currentPlayersId, setCurrentPlayersId] = useState("");
    const [otherPlayersId, setOtherPlayersId] = useState("");
    const [currentPlayersUsername, setCurrentPlayersUsername] = useState("en espera");
    const [otherPlayersUsername, setOtherPlayersUsername] = useState("en espera");

    useEffect(() => {
        let newStatus;
        
        if (props.gameNumberOutput) {
            getCurrentGame(props.gameNumberOutput).then(function (response) {

                if (props.currentPlayersSymbol === "X") {

                    setCurrentPlayersId(response.game.player_x_id);
                    setOtherPlayersId(response.game.player_o_id);

                } else if (props.currentPlayersSymbol === "O") {

                    setCurrentPlayersId(response.game.player_o_id);
                    setOtherPlayersId(response.game.player_x_id);

                }
                
            });
        }

        if (currentPlayersId) {
            getPlayer(currentPlayersId).then(function (response) {
                setCurrentPlayersUsername(response.user.username);
            });
        } 

        if (otherPlayersId) {
            getPlayer(otherPlayersId).then(function (response) {
                setOtherPlayersUsername(response.user.username);
            });
        }

        // En cada renderización averiguamos si alguien ganó, si hay empate o si se sigue jugando
        const winner = calculateWinner(props.cells);

        // Si el juego ha terminado
        if (winner) {
            if (winner === 'X') {
                newStatus = `Ganador: X`;
            } else if (winner === 'O') {
                newStatus = `Ganador: O`;
            } else newStatus = `Ganador: ${winner}`;
        } else {
            newStatus = `Próximo jugador: ${((props.turn === 'X') ? 'X' : 'O')}`;
        }

        setStatus(newStatus);
    }, [props, currentPlayersId, otherPlayersId]); 

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
                    <br />
                    <p>
                        Vos: {currentPlayersUsername} ({props.currentPlayersSymbol})
                    </p>
                    <br />
                    <p>
                        Tu oponente: {otherPlayersUsername} ({props.otherPlayersSymbol})
                    </p>
                    <br />
                </div>
            </div>
            <div className = "status">
                {status}
            </div>
        </div>
    );
}