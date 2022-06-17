import { useState } from "react";
import Info from "./Info.tsx";
import Board from "./Board.tsx";
import Button from "./Button.tsx";
import calculateWinner from "../utils/calculateWinner.ts";
import { newGame, updateCurrentGame } from "../utils/gameServices.ts";


export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameNumberInput, setGameNumberInput] = useState("");
    const [gameNumberOutput, setGameNumberOutput] = useState("");
    const [cells, setCells] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleNewGameClick = () => {
        setGameStarted(true);

        newGame().then(function (response) {

            setGameNumberOutput(response.game.id);
            setCells(JSON.parse(response.game.cells));

        });

    }

    const handleJoinGameClick = () => {
        if (!gameNumberInput) {
            alert("Por favor ingresa un número de partida para unirte a una.");
            return;
        }
    }

    const handleCellClick = (i) => {
        if (gameStarted) {
            console.log(cells)
            const currentCells = cells.slice();

            // No se puede clickear sobre una celda si el juego ha terminado (termina cuando calculateWinner encuentra a un ganador o cuando detecta empate) o si ya tiene texto 
            if (calculateWinner(currentCells) || currentCells[i]) { 
                return;
            }
        
            // Si es posible clickear, se coloca el símbolo en el cuadrado de acuerdo al turno
            currentCells[i] = xIsNext ? 'X' : 'O';

            // Se actualiza el estado del tablero 
            updateCurrentGame(i, currentCells[i], gameNumberOutput);
            setCells(currentCells);

            // Se cambia de turno
            setXIsNext(!xIsNext)
        }
    }
    
    return (
        <><h1>TA TE TI</h1>
        <div className="game">
            <Info 
                gameNumberInput = {gameNumberInput}
                onGameNumberInputChange = {(event) => setGameNumberInput(event.target.value)}
                gameNumberOutput = {gameNumberOutput}
                cells = {cells}
                xIsNext = {xIsNext}
            />
            <Board 
                cells = {cells}
                xIsNext = {xIsNext}
                onCellClick = {handleCellClick}
            />
        </div>
        <div className="btns-container">
            <Button 
                value = "Nueva partida"
                onClick = {handleNewGameClick}
            />
            <Button 
                value = "Unirse a partida"
                onClick = {handleJoinGameClick}
            />
        </div>
        </>
    );
}