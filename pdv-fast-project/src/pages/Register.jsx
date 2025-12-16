import { useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import RegisterForm from "../features/Form/Register/RegisterForm";

export default function Register() {
    const navigate = useNavigate();

    const {
        isLoading,
        errorMessage,
        handleRegister,
    } = useRegister(navigate);

    return (
        <RegisterForm
            onSubmit={handleRegister}
            isLoading={isLoading}
            errorMessage={errorMessage}
        />
    );
}
