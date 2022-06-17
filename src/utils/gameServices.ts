import axios from "axios";
import { updateSessionGame } from "./store.ts";
import { User } from "./userServices";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

const backendUrl = "http://localhost:3000";

export interface Game {
    id: string
    player_x_id: string
    player_o_id: string
    over: string
    cells: string[]
}

export async function newGame(): Promise<Game> {
    const res = (await axios.post(backendUrl + "/games", {})).data as Game;

    localStorage.setItem("game", JSON.stringify(res));
    updateSessionGame(res);

    return res;
}

export async function getCurrentPlayer(userId: string): Promise<User> {
    const res = (await axios.get(backendUrl + "/users/" + userId, {})).data as User;
    return res;
}

export async function updateCurrentGame(index, value, gameId) {
    await axios.patch(backendUrl + "/games/" + gameId, {
        params: {
            game: {
              cell: {
                index: index,
                value: value
              },
              over: false
            }
        }
    })
    .then(function (response) {
        console.log(response);
    });
}