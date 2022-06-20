import { useState } from "react";
import Info from "./Info.tsx";
import Board from "./Board.tsx";
import Button from "./Button.tsx";
import calculateWinner from "../utils/calculateWinner.ts";
import { newGame, getCurrentGame, updateCurrentGame, joinGame, finishGame } from "../utils/gameServices.ts";
import { Link } from "react-router-dom";

export default function Game() {
    // controla si la partida actual ha terminado
    const [gameOver, setGameOver] = useState(false);

    // valor del input donde se ingresa el número (id) de partida para unirse
    const [gameNumberInput, setGameNumberInput] = useState("");

    // label donde aparece el número (id) de la partida actual
    const [gameNumberOutput, setGameNumberOutput] = useState("");

    // símbolo (X/O) del jugador de este browser
    const [currentPlayersSymbol, setCurrentPlayersSymbol] = useState("");

    // símbolo (X/O) del jugador del otro browser
    const [otherPlayersSymbol, setOtherPlayersSymbol] = useState("");

    // arreglo que representa las 9 celdas del tablero
    const [cells, setCells] = useState(Array(9).fill(null));

    // turno actual (X/O)
    const [turn, setTurn] = useState("X");

    let gameId = "";

    // verifica cada segundo el turno y el tablero de la partida actual
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

    // Nueva partida
    const handleNewGameClick = () => {
        // que gameNumberOutput tenga un valor implica que ya se estaba jugando en este browser
        if (gameNumberOutput) {
            alert("Debes reiniciar antes de comenzar una nueva partida");
            return;
        }

        // creación de la partida 
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

    // Unirse a una partida existente
    const handleJoinGameClick = () => {      
        if (gameNumberOutput) {
            alert("Debes reiniciar antes de unirte a una nueva partida");
            return;
        }

        if (!gameNumberInput) {
            alert("Por favor ingresa un número de partida para unirte a una.");
            return;
        }

        gameId = gameNumberInput;

        // Actualización de la partida existente
        try {
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
        } catch (err) {
            alert("No existe partida con ese número. Intente nuevamente.")
            throw err;
        } 

        checkBoardStatus();
    }

    // Se hace click en una celda
    const handleCellClick = (i) => {
        let currentCells = cells.slice();
        let currentTurn = turn;

        // No se puede clickear sobre una celda si el juego ha terminado (cuando calculateWinner encuentra a un ganador o detecta empate), si ya tiene texto o si no es el turno del jugador actual
        if (calculateWinner(currentCells) || currentCells[i] || currentTurn !== currentPlayersSymbol) { 
            return;
        }
        
        // Si es posible clickear, se coloca el símbolo en el cuadrado de acuerdo al jugador
        currentCells[i] = currentPlayersSymbol;

        // Se cambia de turno
        currentTurn = (currentTurn === 'X') ? 'O' : 'X';

        // Se actualiza el estado de juego 
        updateCurrentGame(i, currentPlayersSymbol, currentTurn, gameNumberOutput)
        .then(function (response) {
            console.log(response);
            currentCells = response.game.cells;
            setCells(currentCells);
            currentTurn = response.game.turn;
            setTurn(currentTurn);
        });

        // En caso de que este click lleve al fin del juego
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
            <Link 
                to="/login" 
                className="link"
                onClick = {() => localStorage.clear()}
            >
                Reiniciar
            </Link>
        </div>
        </>
    );
}