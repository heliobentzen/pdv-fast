import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

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
        <div className="flex flex-col w-full max-w-md mx-auto px-6 py-8 sm:px-8 sm:py-10 rounded-xl shadow-2xl border-2 border-orange-500/50 bg-gradient-to-br from-neutral-900 via-black to-neutral-950">
            
            {/* CABEÇALHO */}
            <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
                    Login
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base">
                    Acesse sua conta para continuar
                </p>
            </div>

            {/* FORMULÁRIO */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                
                {/* EMAIL */}
                <div>
                    <input
                        type="email"
                        placeholder="Digite seu email"
                        className={`w-full px-4 py-3 rounded-lg border-2 bg-neutral-800/50 text-white placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 ${
                            errors.email 
                                ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' 
                                : 'border-neutral-700 hover:border-neutral-600 focus:border-orange-500'
                        }`}
                        {...register("email", {
                            required: "O e-mail é obrigatório",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "E-mail inválido",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-400 ml-1">{errors.email.message}</p>
                    )}
                </div>

                {/* SENHA */}
                <div>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        className={`w-full px-4 py-3 rounded-lg border-2 bg-neutral-800/50 text-white placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 ${
                            errors.password 
                                ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' 
                                : 'border-neutral-700 hover:border-neutral-600 focus:border-orange-500'
                        }`}
                        {...register("password", {
                            required: "A senha é obrigatória",
                        })}
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-400 ml-1">{errors.password.message}</p>
                    )}
                </div>

                {/* MENSAGENS DE FEEDBACK */}
                {errorMessage && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-sm">
                        <p className="text-red-300 text-sm">{errorMessage}</p>
                    </div>
                )}

                {successMessage && (
                    <div className="p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-lg backdrop-blur-sm">
                        <p className="text-emerald-300 text-sm">{successMessage}</p>
                    </div>
                )}

                {/* BOTÃO ENTRAR */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-400 disabled:to-orange-500 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border-2 border-orange-500/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 text-lg"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Aguarde...
                        </>
                    ) : (
                        <>
                            Entrar
                        </>
                    )}
                </button>
            </form>

            {/* LINK CADASTRO */}
            <p className="text-center mt-8 pt-6 border-t border-neutral-800 text-neutral-400 text-sm">
                Não tem conta?{" "}
                <Link
                    to="/register"
                    className="text-orange-400 hover:text-orange-300 font-semibold transition-all duration-200 hover:underline underline-offset-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 bg-clip-text hover:from-orange-600/30 hover:to-orange-700/30 px-1 py-0.5 rounded"
                >
                    Cadastre-se
                </Link>
            </p>
        </div>
    );
}
