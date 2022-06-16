import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.tsx";
import Login from "./Login.tsx";
import Register from "./Register.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}