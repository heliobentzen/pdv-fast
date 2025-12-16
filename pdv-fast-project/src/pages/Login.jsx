import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import LoginForm from "../features/Form/Login/LoginForm";

export default function Login() {
    const navigate = useNavigate();

    const {
        isLoading,
        errorMessage,
        successMessage,
        handleLogin,
    } = useLogin(navigate);

    return (
        <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            errorMessage={errorMessage}
            successMessage={successMessage}
        />
    );
}
