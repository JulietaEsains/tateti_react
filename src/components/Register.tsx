import { useState } from "react";
import createUser from "../utils/backendServices.ts";
import Button from "./Button.tsx";
import Input from "./Input.tsx";

export default function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleRegistration = (event) => {
        event.preventDefault();
        createUser(name, username, email, password);
    }

    return(
        <div className="user-form">
            <form autoComplete="off">
                <label>
                    Nombre: <Input 
                        name = "name"
                        type = "text"
                        value = {name}
                        onChange = {handleNameChange}
                    />
                </label>
                <br />
                <label>
                    Nombre de usuario: <Input 
                        name = "username"
                        type = "text"
                        value = {username}
                        onChange = {handleUsernameChange}
                    />
                </label>
                <br />
                <label>
                    Email: <Input 
                        name = "email"
                        type = "email"
                        value = {email}
                        onChange = {handleEmailChange}
                    />
                </label>
                <br />
                <label>
                    Contraseña: <Input 
                        name = "password"
                        type = "password"
                        value = {password}
                        onChange = {handlePasswordChange}
                    />
                </label>

                <div className="btns-container btn-confirm">
                    <Button 
                        value = "Confirmar"
                        onClick = {handleRegistration}
                    />
                </div>
            </form>
        </div>
    );
}