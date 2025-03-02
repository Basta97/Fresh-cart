
import { Navigate } from "react-router-dom";


export function AuthView({children}){
    return (
        <>
        {localStorage.getItem("authToken") ? <Navigate to="/Home" /> : children}
        </>
    )
}