import axios from "axios";
import { updateSessionGame } from "./store.ts";
import { User } from "./userServices.ts";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

const backendUrl = "http://localhost:3000";

export interface Game {
    id: string
    player_x_id: string
    player_o_id: string
    over: string
    cells: string[]
    turn: string
}

// Nueva partida donde el jugador X es el usuario autenticado que realiza la request
export async function newGame(): Promise<Game> {
    const res = (await axios.post(`${backendUrl}/games`, {})).data as Game;

    localStorage.setItem("game", JSON.stringify(res));
    updateSessionGame(res);

    return res;
}

// Consultar la partida con determinado id
export async function getCurrentGame(gameId: string): Promise<Game> {

    return (await axios.get(`${backendUrl}/games/${gameId}`, {})).data as Game;

}

// Consultar el jugador con un determinado id
export async function getPlayer(userId: string): Promise<User> {

    return (await axios.get(`${backendUrl}/users/${userId}`, {})).data as User;

}

// Actualizar el tablero y el turno dado el click en una celda
export async function updateCurrentGame
    (index: number, value: string, turn: string, gameId: string): Promise<Game> {
    return (await axios.patch(`${backendUrl}/games/${gameId}`, {
        game: {
            cell: {
              index: index,
              value: value
            },
            over: false,
            turn: turn
        }
    })).data as Game;
}

// Actualizar una partida donde el jugador O pasa a ser el autenticado que realiza la request
export async function joinGame(gameId: string): Promise<Game> {

    const res = (await axios.patch(`${backendUrl}/games/${gameId}`, {})).data as Game;

    localStorage.setItem("game", JSON.stringify(res));
    updateSessionGame(res);

    return res;
}

// Actualizar una partida para que quede como terminada
export async function finishGame
    (index: number, value: string, turn: string, gameId: string): Promise<Game> {
    return (await axios.patch(`${backendUrl}/games/${gameId}`, {
        game: {
            cell: {
              index: index,
              value: value
            },
            over: true,
            turn: turn
        }
    })).data as Game;
}