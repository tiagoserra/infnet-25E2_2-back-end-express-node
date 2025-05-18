import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api",
});

export const login = async (email, password) => {
    try {
        const response = await api.post("/auth/login", {
            login: email,
            password: password,
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
    }
};

export const getData = async (token, endpoint) => {
    try {
        const response = await api.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        throw error;
    }
};

export const postData = async (token, endpoint, data) => {
    try {
        const response = await api.post(endpoint, 
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao realizar post", error);
        throw error;
    }
};

export const putData = async (token, endpoint, data) => {
    try {
        const response = await api.put(endpoint, 
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar dados:", error);
        throw error;
    }
};

export const deleteData = async (token, endpoint) => {
    try {
        const response = await api.delete(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir dados:", error);
        throw error;
    }
};