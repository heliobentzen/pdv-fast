import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Message from "../../../components/ui/Message";

export default function RegisterForm({
    onSubmit,
    isLoading,
    errorMessage,
    successMessage,
}) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");

    return (
        <div className="flex flex-col w-full px-8 py-10 rounded-xl shadow-xl border border-orange-500 bg-neutral-900 max-w-md mx-auto">

            {/* CABEÇALHO */}
            <h2 className="text-4xl font-extrabold text-center mb-2 text-orange-500">
                Cadastro
            </h2>

            <p className="text-center text-neutral-400 mb-6">
                Crie sua conta para continuar
            </p>

            {/* FORMULÁRIO */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                {/* NOME */}
                <Input
                    type="text"
                    placeholder="Digite seu nome"
                    error={errors.name?.message}
                    {...register("name", {
                        required: "O nome é obrigatório",
                    })}
                />

                {/* EMAIL */}
                <Input
                    type="email"
                    placeholder="Digite seu email"
                    error={errors.email?.message}
                    {...register("email", {
                        required: "O e-mail é obrigatório",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "E-mail inválido",
                        },
                    })}
                />

                {/* SENHA */}
                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    error={errors.password?.message}
                    {...register("password", {
                        required: "A senha é obrigatória",
                        minLength: {
                            value: 6,
                            message: "A senha deve ter no mínimo 6 caracteres",
                        },
                    })}
                />

                {/* CONFIRMAR SENHA */}
                <Input
                    type="password"
                    placeholder="Confirme sua senha"
                    error={errors.confirmPassword?.message}
                    {...register("confirmPassword", {
                        required: "Confirme sua senha",
                        validate: (value) =>
                            value === password || "As senhas não coincidem",
                    })}
                />

                {/* MENSAGENS DE FEEDBACK */}
                {errorMessage && (
                    <Message message={errorMessage} type="error" />
                )}

                {successMessage && (
                    <Message message={successMessage} type="success" />
                )}

                {/* BOTÃO */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-400 disabled:to-orange-500 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border-2 border-orange-500/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 text-lg"
                >
                    {isLoading ? "Aguarde..." : "Cadastrar"}
                </Button>
            </form>

            {/* LINK LOGIN */}
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
}