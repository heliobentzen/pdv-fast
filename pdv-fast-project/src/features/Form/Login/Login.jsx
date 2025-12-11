import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    async function onSubmit(data) {
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await fetch(
                `http://localhost:3000/users?email=${data.email}`
            );

            const users = await response.json();

            if (users.length === 0) {
                setError("Usuário não encontrado.");
                return;
            }

            const user = users[0];

            if (user.password !== data.password) {
                setError("Senha incorreta.");
                return;
            }

            setSuccess("Login realizado com sucesso! 🎉");

            localStorage.setItem("user", JSON.stringify(user));

            setTimeout(() => {
                navigate("/");
            }, 1200);
        } catch (err) {
            setError("Erro ao conectar com o servidor.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setError("");
        setSuccess("");
    }, []);

    return (
        <div className="flex flex-col w-full px-30 py-30 rounded-xl shadow-xl border border-orange-500 bg-neutral-900 max-w-md mx-auto">

            <h2 className="text-4xl font-extrabold text-center mb-2 text-orange-500">
                Login
            </h2>

            <p className="text-center text-neutral-400 mb-6">
                Acesse sua conta para continuar
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                {/* EMAIL */}
                <input
                    type="email"
                    placeholder="Digite seu email"
                    {...register("email", {
                        required: "O e-mail é obrigatório",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "E-mail inválido"
                        }
                    })}
                    className="px-4 py-3 rounded-lg border border-orange-500 bg-black text-orange-400 placeholder-neutral-600
                       focus:ring-2 focus:ring-orange-600 outline-none transition"
                />

                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                {/* SENHA */}
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    {...register("password", {
                        required: "A senha é obrigatória"
                    })}
                    className="px-4 py-3 rounded-lg border border-orange-500 bg-black text-orange-400 placeholder-neutral-600
                       focus:ring-2 focus:ring-orange-600 outline-none transition"
                />

                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}

                {/* ERROS DO BACKEND */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                {!loading ? (
                    <button
                        type="submit"
                        className="px-4 py-3 rounded-lg border border-orange-500 bg-black text-orange-400 placeholder-neutral-600
                       focus:ring-2 focus:ring-orange-600 outline-1 transition"
                    >
                        Entrar
                    </button>
                ) : (
                    <button
                        disabled
                        className="w-full bg-neutral-700 text-neutral-400 p-3 rounded-lg border border-orange-500"
                    >
                        Aguarde...
                    </button>
                )}
            </form>

            <p className="text-center mt-6 text-neutral-400">
                Não tem conta?{" "}
                <Link
                    to="/register"
                    className="text-orange-500 hover:text-orange-400 font-semibold transition"
                >
                    Cadastre-se
                </Link>
            </p>
        </div>
    );
};

export default Login;
