import axios from 'axios'

const clinicaApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

export const getAppointments = () => {
    return clinicaApi.get('/appointments/')
}

export const getPatients = () => {
    return clinicaApi.get('/patients/')
}

export const getMedicos = () => {
    return clinicaApi.get('/users/')
}

export const getConsultationType = () => {
    return clinicaApi.get('/consultationType/')
}

export const getRol = () => {
    return clinicaApi.get('/roles/')
} 

export const getMedicalSpecialties = () => {
    return clinicaApi.get('/medicalSpecialties/'); 
};

export const addPatient = async (patientData) => {
    try {
        const response = await clinicaApi.post('/patients/', patientData);
        return response.data; // Retorna la respuesta de la API, puede ser útil para manejar la respuesta
    } catch (error) {
        console.error('Error al agregar el paciente:', error);
        throw error; // Lanza el error para que se pueda manejar en el componente
    }
};


export const updatePatient = async (id, patientData) => {
    try {
        const response = await clinicaApi.put(`/patients/${id}/`, patientData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el paciente:', error.response?.data || error); // Muestra el error detallado
        throw error;
    }
};


export const deletePatient = async (id) => {
    try {
        const response = await clinicaApi.delete(`/patients/${id}/`);
        return response.data; // Puede que no devuelva nada
    } catch (error) {
        console.error('Error al eliminar el paciente:', error);
        throw error;
    }
};

export const addAppointment = async (appointmentData) => {
    try {
        const response = await clinicaApi.post('/appointments/', appointmentData);
        return response.data;
    } catch (error) {
        console.error('Error al agendar la cita:', error);
        throw error;
    }
};

export const addUser = async (userData) => {
    try {
        const response = await clinicaApi.post('/users/', userData);
        return response.data;
    } catch (error) {
        console.error('Error al agendar la cita:', error);
        throw error;
    }
};
