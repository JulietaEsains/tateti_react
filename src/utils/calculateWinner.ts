export default function calculateWinner(cells) {
    // Se declara un arreglo de arreglos donde cada elemento representa una posible condición de victoria
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Recorre todos los elementos de lines para verificar si alguno tiene 3 elementos iguales no nulos, es decir verifica si alguien ganó
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
            // Si encuentra a un ganador, retorna su símbolo
        }
    }

    // Si nadie ha ganado aún, pero hay al menos una celda vacía, significa que se puede seguir jugando y por lo tanto retorna null
    for (let cell of cells) {
        if (cell === "" || cell === null) return null;
    }

    // Si nadie ha ganado y además el tablero está lleno, significa que hubo empate
    return 'ninguno (empate)';
    // La info del juego muestra "Ganador: ninguno (empate)"
}