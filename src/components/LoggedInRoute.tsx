import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useSessionToken } from "../utils/store.ts";

interface PropType {
    component: React.FC;
}
  
export const StateLoggedInRoute: FC<PropType> = ({component: Component}) => {
    const token = useSessionToken();
  
    const isAuthenticated  = token !== undefined;
  
    if (isAuthenticated) return <Component />;

    // else
    alert("Debes iniciar sesión con un usuario válido para poder jugar.");
    return <Navigate to='/' />;
}