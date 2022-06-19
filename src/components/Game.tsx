import { useState } from "react";
import Info from "./Info.tsx";
import Board from "./Board.tsx";
import Button from "./Button.tsx";
import calculateWinner from "../utils/calculateWinner.ts";
import { newGame, getCurrentGame, updateCurrentGame, joinGame } from "../utils/gameServices.ts";

export default function Game() {
    const [gameOver, setGameOver] = useState(false);
    const [gameNumberInput, setGameNumberInput] = useState("");
    const [gameNumberOutput, setGameNumberOutput] = useState("");
    const [currentPlayersSymbol, setCurrentPlayersSymbol] = useState("");
    const [otherPlayersSymbol, setOtherPlayersSymbol] = useState("");
    const [cells, setCells] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState("X");

    let gameId = "";

    const checkBoardStatus = () => {
        setInterval(() => {
            if (!gameOver) {
                getCurrentGame(gameId).then(function (response) {
                    console.log(response)
                    setTurn(response.game.turn);
                    setCells(JSON.parse(response.game.cells));
                });
            }
        }, 1000);
    }

    // DESPUÉS BORRAR
    const mostrarInfoParaDebuggear = () => {
        console.log(`game over: ${gameOver}`);
        console.log(`game number input: ${gameNumberInput}`);
        console.log(`game number output: ${gameNumberOutput}`);
        console.log(`current player's symbol: ${currentPlayersSymbol}`);
        console.log(`other player's symbol: ${otherPlayersSymbol}`);
        console.log(`cells: ${cells}`);
        console.log(`turn: ${turn}`);
    }
    // DESPUÉS BORRAR LO DE ARRIBA

    const handleNewGameClick = () => {
        mostrarInfoParaDebuggear();

        newGame().then(function (response) {
            gameId = response.game.id;
            setGameNumberOutput(gameId);
            setCells(JSON.parse(response.game.cells));
        });

        setCurrentPlayersSymbol("X");
        setOtherPlayersSymbol("O");
        setTurn("X");
        setGameOver(false);

        checkBoardStatus();
        mostrarInfoParaDebuggear();
    }

    const handleJoinGameClick = () => {
        mostrarInfoParaDebuggear();
        
        if (!gameNumberInput) {
            alert("Por favor ingresa un número de partida para unirte a una.");
            return;
        }

        gameId = gameNumberInput;

        joinGame(gameNumberInput).then(function (response) {
            gameId = response.game.id;
            setGameNumberOutput(gameId);
            setCells(JSON.parse(response.game.cells));
            setTurn(response.game.turn);
        });

        setCurrentPlayersSymbol("O");
        setOtherPlayersSymbol("X");
        setGameOver(false);

        checkBoardStatus();

        mostrarInfoParaDebuggear();
    }

    const handleCellClick = (i) => {
        let currentCells = cells.slice();

        // No se puede clickear sobre una celda si el juego ha terminado (cuando calculateWinner encuentra a un ganador o detecta empate), si ya tiene texto o si no es el turno del jugador actual
        if (calculateWinner(currentCells) || currentCells[i] || turn !== currentPlayersSymbol) { 
            return;
        }
        
        // Si es posible clickear, se coloca el símbolo en el cuadrado de acuerdo al turno
        currentCells[i] = currentPlayersSymbol;

        // Se cambia de turno
        setTurn((turn === 'X') ? 'O' : 'X');

        // Se actualiza el estado de juego 
        updateCurrentGame(i, currentPlayersSymbol, turn, gameNumberOutput).then(function (response) {
            console.log(response);
            currentCells = JSON.parse(response.game.cells);
        });
        setCells(currentCells);

        mostrarInfoParaDebuggear();
    }
    
    return (
        <><h1>TA TE TI</h1>
        <div className="game">
            <Info 
                gameNumberInput = {gameNumberInput}
                onGameNumberInputChange = {(event) => setGameNumberInput(event.target.value)}
                gameNumberOutput = {gameNumberOutput}
                currentPlayersSymbol = {currentPlayersSymbol}
                otherPlayersSymbol = {otherPlayersSymbol}
                cells = {cells}
                turn = {turn}
            />
            <Board 
                cells = {cells}
                turn = {turn}
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