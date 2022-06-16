import axios from "axios";
import { useState } from "react";
import Info from "./Info.tsx";
import Board from "./Board.tsx";
import Button from "./Button.tsx";
import calculateWinner from "../utils/calculateWinner.ts";

export default function Game() {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentPlayersEmail, setCurrentPlayersEmail] = useState('');
    const [playersPassword, setPlayersPassword] = useState('');
    const [gameNumberInput, setGameNumberInput] = useState('');
    const [gameNumberOutput, setGameNumberOutput] = useState('');
    const [cells, setCells] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleNewGameClick = () => {
        if (!currentPlayersEmail || !playersPassword) {
            alert('Por favor ingresa tu email y tu contraseña para empezar una partida.');
            return;
        }
        
        setGameStarted(true);
        setGameNumberOutput('falta agregar petición al backend');
    }

    const handleJoinGameClick = () => {
        if (!currentPlayersName || !accessTokenInput) {
            alert('Por favor ingresa tu nombre y un token de acceso para unirte a una partida.');
            return;
        }
    }

    const handleCurrentPlayersNameChange = (event) => {
        setCurrentPlayersName(event.target.value); 
    } 

    const handleAccessTokenInputChange = (event) => {
        setAccessTokenInput(event.target.value); 
    } 

    const handleCellClick = (i) => {
        if (gameStarted) {
            const currentCells = cells.slice();

            // No se puede clickear sobre una celda si el juego ha terminado (termina cuando calculateWinner encuentra a un ganador o cuando detecta empate) o si ya tiene texto 
            if (calculateWinner(currentCells) ||    currentCells[i]) { 
                return;
            }
        
            // Si es posible clickear, se coloca el símbolo en el cuadrado de acuerdo al turno
            currentCells[i] = xIsNext ? 'X' : 'O';

            // Se actualiza el estado del tablero 
            setCells(currentCells);

            // Se cambia de turno
            setXIsNext(!xIsNext)
        }
    }
    
    return (
        <><h1>TA TE TI</h1>
        <div className="game">
            <Info 
                currentPlayersName = {currentPlayersName}
                onCurrentPlayersNameChange = {handleCurrentPlayersNameChange}
                accessTokenInput = {accessTokenInput}
                onAccessTokenInputChange = {handleAccessTokenInputChange}
                accessTokenOutput = {accessTokenOutput}
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