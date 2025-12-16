import { api } from "./api";

export async function loginUser({ email, password }) {
    const users = await api.get(`/users?email=${email}`);

    if (!users || users.length === 0) {
        throw new Error("Usuário não encontrado.");
    }

    const user = users[0];

    if (user.password !== password) {
        throw new Error("Senha incorreta.");
    }

    // ❌ nunca retornar senha
    const { password: _, ...safeUser } = user;
    return safeUser;
}

export async function registerUser({ name, email, password }) {
    const existingUsers = await api.get(`/users?email=${email}`);

    if (existingUsers.length > 0) {
        throw new Error("Este e-mail já está cadastrado.");
    }

    const newUser = await api.post("/users", {
        name,
        email,
        password, // apenas mock
    });

    const { password: _, ...safeUser } = newUser;
    return safeUser;
}