import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const Register = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const password = watch("password");

    async function onSubmit(data) {
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            //  Verifica se usuário já existe
            const checkUser = await fetch(
                `http://localhost:3000/users?email=${data.email}`
            );
            const existingUsers = await checkUser.json();

            if (existingUsers.length > 0) {
                setError("Este e-mail já está cadastrado.");
                return;
            }

            //  Cria novo usuário
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                setError("Erro ao cadastrar usuário.");
                return;
            }

            setSuccess("Cadastro realizado com sucesso! 🎉");

            setTimeout(() => {
                navigate("/login");
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
        <div className="flex flex-col w-full px-8 py-10 rounded-xl shadow-xl border border-orange-500 bg-neutral-900 max-w-md mx-auto">

            <h2 className="text-4xl font-extrabold text-center mb-2 text-orange-500">
                Cadastro
            </h2>

            <p className="text-center text-neutral-400 mb-6">
                Crie sua conta para continuar
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                {/* NOME */}
                <input
                    type="text"
                    placeholder="Digite seu nome"
                    {...register("name", {
                        required: "O nome é obrigatório"
                    })}
                    className="px-4 py-3 rounded-lg border border-orange-500 bg-black text-orange-400 placeholder-neutral-600
                    focus:ring-2 focus:ring-orange-600 outline-none transition"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

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
                        required: "A senha é obrigatória",
                        minLength: {
                            value: 6,
                            message: "A senha deve ter no mínimo 6 caracteres"
                        }
                    })}
                    className="px-4 py-3 rounded-lg border border-orange-500 bg-black text-orange-400 placeholder-neutral-600
                    focus:ring-2 focus:ring-orange-600 outline-none transition"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}

                {/* CONFIRMAR SENHA */}
                <input
                    type="password"
                    placeholder="Confirme sua senha"
                    {...register("confirmPassword", {
                        required: "Confirme sua senha",
                        validate: value =>
                            value === password || "As senhas não coincidem"
                    })}
                    className="px-4 py-3 rounded-lg border border-orange-500 bg-black text-orange-400 placeholder-neutral-600
                    focus:ring-2 focus:ring-orange-600 outline-none transition"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                        {errors.confirmPassword.message}
                    </p>
                )}

                {/* ERROS DO BACKEND */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                {!loading ? (
                    <button
                        type="submit"
                        className="px-4 py-3 rounded-lg border border-orange-500 bg-black text-orange-400
                        focus:ring-2 focus:ring-orange-600 outline-1 transition"
                    >
                        Cadastrar
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
                Já tem conta?{" "}
                <Link
                    to="/login"
                    className="text-orange-500 hover:text-orange-400 font-semibold transition"
                >
                    Entrar
                </Link>
            </p>
        </div>
    );
};

export default Register;
