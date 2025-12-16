import { useState } from "react";
import { registerUser } from "../services/authService";
import { useAuth } from "./useAuth";
import { toast } from "react-hot-toast";

export default function useRegister(navigate) {
    const { login } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleRegister(formData) {
        setErrorMessage("");
        setIsLoading(true);

        try {
            const user = await registerUser(formData);


            login(user);

            toast.success("Cadastro realizado com sucesso!");

            navigate("/");
        } catch (err) {
            const message = err.message || "Erro ao realizar cadastro";
            setErrorMessage(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        errorMessage,
        handleRegister,
    };
}
