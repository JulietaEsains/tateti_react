import { useLayoutEffect, useState } from "react";
import { Subject } from "rxjs"
import { Game } from "./gameServices.ts";
import { User } from "./userServices.ts";

// USUARIO

let currentUser: User | undefined;

const userSubject = new Subject<User | undefined>()

export function useSessionUser() {
    const [user, setUser] = useState(currentUser);

    useLayoutEffect(() => {
        userSubject.subscribe((newState) => {
            setUser(newState);
        });
    }, []);

    return user;
}

export function updateSessionUser(user: User) {
    currentUser = user;
    userSubject.next(currentUser);
}
  
export function cleanupSessionUser() {
    currentUser = undefined;
    userSubject.next(currentUser);
}

// TOKEN

let currentToken: string | undefined;

const tokenSubject = new Subject<string | undefined>();

export function useSessionToken() {
  const [token, setToken] = useState(currentToken);

  useLayoutEffect(() => {
    tokenSubject.subscribe((newState) => {
      setToken(newState);
    });
  }, []);

  return token;
}

export function updateSessionToken(token: string) {
  currentToken = token;
  tokenSubject.next(currentToken);
}

export function cleanupSessionToken() {
  currentToken = undefined;
  tokenSubject.next(currentToken);
}

// PARTIDA

let currentGame: Game | undefined;

const gameSubject = new Subject<Game | undefined>();

export function useSessionGame() {
  const [game, setGame] = useState(currentGame);

  useLayoutEffect(() => {
    gameSubject.subscribe((newState) => {
      setGame(newState);
    });
  }, []);

  return game;
}

export function updateSessionGame(game: Game) {
  currentGame = game;
  gameSubject.next(currentGame);
}