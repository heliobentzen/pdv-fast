import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const user = localStorage.getItem("user");

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}