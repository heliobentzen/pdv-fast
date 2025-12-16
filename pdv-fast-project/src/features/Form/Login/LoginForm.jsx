import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Message from "@/components/ui/Message";

export default function LoginForm({
    onSubmit,
    isLoading,
    errorMessage,
    successMessage,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div className="flex flex-col w-full px-8 py-10 rounded-xl shadow-xl border border-orange-500 bg-neutral-900 max-w-md mx-auto">

            {/* CABEÇALHO */}
            <h2 className="text-4xl font-extrabold text-center mb-2 text-orange-500">
                Login
            </h2>

            <p className="text-center text-neutral-400 mb-6">
                Acesse sua conta para continuar
            </p>

            {/* FORMULÁRIO */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

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
                    variant="primary"
                    className="w-full"
                >
                    {isLoading ? "Aguarde..." : "Entrar"}
                </Button>
            </form>

            {/* LINK CADASTRO */}
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
}
