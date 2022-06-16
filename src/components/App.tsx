import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.tsx";
import { StateLoggedInRoute } from "./LoggedInRoute.tsx";
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import Game from "./Game.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/game" element={<StateLoggedInRoute component={Game} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}