import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token"); // Replace with your authentication logic

    if(!token){
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

export default ProtectedRoute;
