import Board from "./Board.tsx";

export default function Game() {
    return (
        <><h1>TA TE TI</h1>
        <div className="game">
            <Board />
        </div>
        
        { /* Botón para recargar la página, es decir reiniciar el juego */}
        <div className = "reloadContainer">

            <a 
                href = "http://localhost:3000/"
                id = "reload"
            >
                Reiniciar
            </a>

        </div>
        
        </>
    );
}