import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return(
        <div>
            <div className="links-container">
                <Link to="/login" className="link">Iniciar sesión</Link>
                <Link to="/register" className="link">Registrarse</Link>
            </div>

            <Outlet />
        </div>
    );
}