// Tablero
import calculateWinner from "../utils/CalculateWinner";
import Cell from "./Cell";

export default function Board(props) {
    // Método para manejar el click en cada celda
    const handleClick = (i) => {
        // Se obtiene una copia del estado actual de las celdas
        const currentCells = props.cells.slice();

        // No se puede clickear sobre una celda si el juego ha terminado (termina cuando calculateWinner encuentra a un ganador o cuando detecta empate) o si ya tiene texto 
        if (calculateWinner(currentCells) || currentCells[i]) return;

        // Si es posible clickear, se coloca el símbolo en el cuadrado de acuerdo al turno
        currentCells[i] = props.xIsNext ? 'X' : 'O';

        // Se actualiza el estado del tablero 
        props.cells = currentCells;

        // Se cambia de turno
        props.xIsNext = !props.xIsNext;
    }

    // Renderiza cada celda
    const renderCell = (i) => {
        return (
            <Cell 
                value = {props.cells[i]}
                onClick = {handleClick}
            />
        );
    } 

    // Renderiza el tablero
    return (
        <div>
            <div className = "board-row">
                {renderCell(0)}
                {renderCell(1)}
                {renderCell(2)}
            </div>
            <div className = "board-row">
                {renderCell(3)}
                {renderCell(4)}
                {renderCell(5)}
            </div>
            <div className = "board-row">
                {renderCell(6)}
                {renderCell(7)}
                {renderCell(8)}
            </div>
        </div>
    );
}