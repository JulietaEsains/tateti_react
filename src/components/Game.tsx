import { useState } from "react";
import Info from "./Info.tsx";
import Board from "./Board.tsx";
import Button from "./Button.tsx";
import calculateWinner from "../utils/calculateWinner.ts";
import { newGame, getCurrentGame, updateCurrentGame, joinGame, finishGame } from "../utils/gameServices.ts";

export default function Game() {
    const [gameOver, setGameOver] = useState(false);
    const [gameNumberInput, setGameNumberInput] = useState("");
    const [gameNumberOutput, setGameNumberOutput] = useState("");
    const [currentPlayersSymbol, setCurrentPlayersSymbol] = useState("");
    const [otherPlayersSymbol, setOtherPlayersSymbol] = useState("");
    const [cells, setCells] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState("X");

    let gameId = "";

    const initializeState = () => {
        setGameOver(false);
        setGameNumberInput("");
        setGameNumberOutput("");
        setCurrentPlayersSymbol("");
        setOtherPlayersSymbol("");
        setCells(new Array(9).fill(null));
        setTurn("X");
        gameId = "";
    }

    const checkBoardStatus = () => {
        let interval = setInterval(() => {
            if (!gameOver) {
                getCurrentGame(gameId).then(function (response) {
                    setTurn(response.game.turn);
                    setCells(response.game.cells);
                });
            } else clearInterval(interval);
        }, 1000);
    }

    const handleNewGameClick = () => {
        initializeState();

        newGame().then(function (response) {
            console.log(response);
            gameId = response.game.id;
            setGameNumberOutput(gameId);
            setCells(response.game.cells);
            setTurn(response.game.turn);
            setCurrentPlayersSymbol("X");
            setOtherPlayersSymbol("O");
            setGameOver(false);
        });

        checkBoardStatus();
    }

    const handleJoinGameClick = () => {      
        if (!gameNumberInput) {
            alert("Por favor ingresa un número de partida para unirte a una.");
            return;
        }

        initializeState();

        gameId = gameNumberInput;

        joinGame(gameId).then(function (response) {
            console.log(response);
            gameId = response.game.id;
            setGameNumberOutput(gameId);
            setCells(response.game.cells);
            setTurn(response.game.turn);
            setCurrentPlayersSymbol("O");
            setOtherPlayersSymbol("X");
            setGameOver(false);
        });

        checkBoardStatus();
    }

    const handleCellClick = (i) => {
        let currentCells = cells.slice();
        let currentTurn = turn;

        // No se puede clickear sobre una celda si el juego ha terminado (cuando calculateWinner encuentra a un ganador o detecta empate), si ya tiene texto o si no es el turno del jugador actual
        if (calculateWinner(currentCells) || currentCells[i] || currentTurn !== currentPlayersSymbol) { 
            return;
        }
        
        // Si es posible clickear, se coloca el símbolo en el cuadrado de acuerdo al turno
        currentCells[i] = currentPlayersSymbol;

        // Se cambia de turno
        currentTurn = (currentTurn === 'X') ? 'O' : 'X';

        // Se actualiza el estado de juego 
        updateCurrentGame(i, currentPlayersSymbol, currentTurn, gameNumberOutput)
        .then(function (response) {
            console.log(response);
            console.log(response.game)
            console.log(response.game.cells);
            currentCells = response.game.cells;
            setCells(currentCells);
            currentTurn = response.game.turn;
            setTurn(currentTurn);
        });

        if (calculateWinner(cells)) {
            finishGame(i, currentPlayersSymbol, turn, gameNumberOutput).then(function (response) {
                console.log(response);
                setGameOver(response.game.over);
            });
        }
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