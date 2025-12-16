import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Home as HomeIcon, Menu as MenuIcon, User, Settings, LogOut } from "lucide-react";

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);

    // Carrega usuário logado
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="w-full bg-neutral-900 border-b border-orange-500 px-4 py-4 flex items-center justify-between shadow-lg relative">

            {/* ESQUERDA — HOME */}
            <NavLink to="/" className=" flex items-center text-gray-500 hover:text-orange-500">
                <HomeIcon size={26} color="#ff6900" />
            </NavLink>

            {/* CENTRO — NOME */}
            <div className="text-orange-500 font-bold text-xl text-center absolute left-1/2 transform -translate-x-1/2">
                PDV FAST
            </div>

            {/* DIREITA — MENU SUSPENSO */}
            <div className="relative">
                <button
                    className="text-orange-500"
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    <MenuIcon size={26} />
                </button>

                {/* DROPDOWN */}
                {openMenu && (
                    <div className="absolute right-0 mt-2 bg-neutral-800 border border-orange-500 rounded-md shadow-lg w-40 p-2 z-20">

                        {user ? (
                            <>
                                <button
                                    className="flex items-center gap-2 text-orange-400 w-full hover:bg-neutral-700 px-2 py-2 rounded-md"
                                    onClick={() => navigate("/profile")}
                                >
                                    <User size={18} /> Perfil
                                </button>

                                <button
                                    className="flex items-center gap-2 text-orange-400 w-full hover:bg-neutral-700 px-2 py-2 rounded-md"
                                    onClick={() => navigate("/settings")}
                                >
                                    <Settings size={18} /> Configurações
                                </button>

                                <button
                                    className="flex items-center gap-2 text-red-500 w-full hover:bg-neutral-700 px-2 py-2 rounded-md mt-1"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={18} /> Sair
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="text-orange-400 w-full hover:bg-neutral-700 px-2 py-2 rounded-md"
                                    onClick={() => navigate("/login")}
                                >
                                    Entrar
                                </button>

                                <button
                                    className="text-orange-400 w-full hover:bg-neutral-700 px-2 py-2 rounded-md"
                                    onClick={() => navigate("/register")}
                                >
                                    Cadastrar
                                </button>
                            </>
                        )}

                    </div>
                )}
            </div>
        </nav>
    );
}
