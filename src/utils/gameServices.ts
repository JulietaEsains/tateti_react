import axios from "axios";
import { updateSessionGame } from "./store.ts";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

const backendUrl = "http://localhost:3000";

export interface Game {
    id: string
    player_x_id: string
    player_o_id: string
    over: boolean
    cells: string[]
}

export async function newGame(): Promise<Game> {

    const res = (await axios.post(backendUrl + "/games", {})).data as Game;

    localStorage.setItem("game", JSON.stringify(res));
    updateSessionGame(res);

    return res;

}

