import axios from 'axios';

const usersApi = axios.create({
    baseURL: 'http://localhost:8000/api/User/'
});

// Obtener todos los doctores
export const getAllDoctors = () => {
    return usersApi.get("/").then(response => {
        // Filtrar los usuarios cuyo rol sea "Médico"
        return response.data.filter(user => user.role === "Médico");
    });
};
