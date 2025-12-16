import { api } from "./api";

export async function fetchModules() {
    return api.get("/modules");
}