import { Navigate } from 'react-router-dom';




export function ProtectedRoute({ children }) {
 
    return (
        <>
            {localStorage.getItem("authToken") ? children : <Navigate to="/login" />}
        </>
    )
}