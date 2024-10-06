import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getAllAppointments = () => {
  return axios.get(`${API_BASE_URL}/Appointment/`);
};

export const getPatientById = (id) => {
  return axios.get(`${API_BASE_URL}/Patient/${id}/`);
};

export const getDoctorById = (id) => {
  return axios.get(`${API_BASE_URL}/User/${id}/`); // Cambié aquí para usar el endpoint de médicos
};

export const deleteAppointment = async (appointmentId) => {
    // Lógica para eliminar una cita
    const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
    });
    return response.json();
};
