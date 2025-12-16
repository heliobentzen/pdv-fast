import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Home as HomeIcon,
    Menu as MenuIcon,
    User,
    Settings,
    LogOut,
    History,
    Package,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const [openMenu, setOpenMenu] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="w-full bg-neutral-900 border-b border-orange-500 px-4 py-4 flex items-center justify-between shadow-lg relative">

            {/* ESQUERDA — HOME */}
            <NavLink
                to="/"
                className="flex items-center hover:opacity-80 transition"
            >
                <HomeIcon size={26} className="text-orange-500" />
            </NavLink>

            {/* CENTRO — NOME */}
            <div className="text-orange-500 font-bold text-xl absolute left-1/2 -translate-x-1/2">
                PDV FAST
            </div>

            {/* DIREITA — MENU */}
            <div className="relative">
                <button
                    className="text-orange-500 hover:opacity-80 transition"
                    onClick={() => setOpenMenu((prev) => !prev)}
                    aria-label="Menu"
                >
                    <MenuIcon size={26} />
                </button>

                {openMenu && (
                    <div className="absolute right-0 mt-2 bg-neutral-800 border border-orange-500 rounded-md shadow-lg w-52 p-2 z-20">

                        {isAuthenticated ? (
                            <>
                                {/* Menu logado */}
                                <MenuButton
                                    icon={<HomeIcon size={18} />}
                                    label="Início"
                                    onClick={() => {
                                        navigate("/");
                                        setOpenMenu(false);
                                    }}
                                />

                                <MenuButton
                                    icon={<Package size={18} />}
                                    label="Status Pedidos"
                                    onClick={() => {
                                        navigate("/status");
                                        setOpenMenu(false);
                                    }}
                                />

                                <MenuButton
                                    icon={<History size={18} />}
                                    label="Histórico"
                                    onClick={() => {
                                        navigate("/history");
                                        setOpenMenu(false);
                                    }}
                                />

                                <div className="border-t border-orange-600 my-2" />

                                <MenuButton
                                    icon={<User size={18} />}
                                    label="Perfil"
                                    onClick={() => {
                                        navigate("/profile");
                                        setOpenMenu(false);
                                    }}
                                />

                                <MenuButton
                                    icon={<Settings size={18} />}
                                    label="Configurações"
                                    onClick={() => {
                                        navigate("/settings");
                                        setOpenMenu(false);
                                    }}
                                />

                                <div className="border-t border-orange-600 my-2" />

                                <MenuButton
                                    icon={<LogOut size={18} />}
                                    label="Sair"
                                    danger
                                    onClick={handleLogout}
                                />
                            </>
                        ) : (
                            <>
                                {/* Menu deslogado */}
                                <MenuButton
                                    label="Entrar"
                                    onClick={() => {
                                        navigate("/login");
                                        setOpenMenu(false);
                                    }}
                                />
                                <MenuButton
                                    label="Cadastrar"
                                    onClick={() => {
                                        navigate("/register");
                                        setOpenMenu(false);
                                    }}
                                />
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

// ==========================================
// Componente auxiliar: Botão do Menu
// ==========================================
function MenuButton({ icon, label, onClick, danger = false }) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-md
                transition text-left
                ${danger
                    ? "text-red-400 hover:bg-red-900/20"
                    : "text-orange-400 hover:bg-neutral-700"
                }
            `}
        >
            {icon && <span>{icon}</span>}
            <span>{label}</span>
        </button>
    );
}