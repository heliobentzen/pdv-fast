import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "./useAuth";
import { toast } from "react-hot-toast";

export default function useLogin(navigate) {
    const { login } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLogin(formData) {
        setErrorMessage("");
        setIsLoading(true);

        try {
            const user = await loginUser(formData);


            login(user);

            toast.success("Login realizado com sucesso!");

            navigate("/");
        } catch (err) {
            const message = err.message || "Erro ao realizar login";
            setErrorMessage(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        errorMessage,
        handleLogin,
    };
}
