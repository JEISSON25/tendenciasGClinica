import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAppointment, updateAppointment, getAppointment } from '../api/appointments.api';
import { getAllPatients } from '../api/patients.api';
import { getAllDoctors } from '../api/doctors.api';
import { useNavigate, useParams } from 'react-router-dom';

const AppointmentFormPage = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const onSubmit = async (data) => {
        try {
            // Convertir `date_time` al formato ISO
            const payload = {
                ...data,
                date_time: new Date(data.date_time).toISOString(), // Asegúrate de que `date_time` esté en el formato correcto
                patient: parseInt(data.patient), // Asegúrate de enviar el id del paciente como número
                doctor: parseInt(data.doctor)    // Asegúrate de enviar el id del doctor como número
            };

            console.log("Payload enviado:", payload); // Verifica que el payload esté bien antes de enviarlo

            if (params.id) {
                await updateAppointment(params.id, payload);
            } else {
                await createAppointment(payload);
            }
            navigate('/appointments');
        } catch (error) {
            console.error("Error saving appointment:", error);
            if (error.response) {
                console.error("Detalles del error:", error.response.data);
            }
        }
    };

    useEffect(() => {
        const loadAppointment = async () => {
            if (params.id) {
                try {
                    const res = await getAppointment(params.id);
                    setValue("date_time", res.data.date_time);
                    setValue("reason", res.data.reason);
                    setValue("status", res.data.status);
                    setValue("patient", res.data.patient);
                    setValue("doctor", res.data.doctor);
                } catch (error) {
                    console.error("Error loading appointment:", error);
                }
            }
        };
        loadAppointment();
    }, [params.id, setValue]);

    useEffect(() => {
        const loadPatients = async () => {
            try {
                const res = await getAllPatients();
                if (Array.isArray(res.data)) {
                    setPatients(res.data);
                } else {
                    console.error("Error: La respuesta de pacientes no es un arreglo:", res.data);
                }
            } catch (error) {
                console.error("Error loading patients:", error);
            }
        };

        const loadDoctors = async () => {
            try {
                const doctorsList = await getAllDoctors();
                console.log('Doctors loaded:', doctorsList);
                setDoctors(doctorsList); // Aquí aseguramos que estamos asignando la lista correcta al estado
            } catch (error) {
                console.error("Error loading doctors:", error);
            }
        };

        loadPatients();
        loadDoctors();
    }, []);

    return (
        <div>
            <h2>Formulario de Cita</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="date_time">Fecha y Hora:</label>
                    <input
                        type="datetime-local"
                        id="date_time"
                        {...register("date_time", { required: "La fecha y hora son requeridas." })}
                    />
                    {errors.date_time && <p className="error">{errors.date_time.message}</p>}
                </div>

                <div>
                    <label htmlFor="reason">Razón:</label>
                    <input
                        type="text"
                        id="reason"
                        {...register("reason", { required: "La razón es requerida." })}
                    />
                    {errors.reason && <p className="error">{errors.reason.message}</p>}
                </div>

                <div>
                    <label htmlFor="status">Estado:</label>
                    <select id="status" {...register("status", { required: "El estado es requerido." })}>
                        <option value="">Seleccione una opción</option>
                        <option value="Programada">Programada</option>
                        <option value="Completada">Completada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                    {errors.status && <p className="error">{errors.status.message}</p>}
                </div>

                <div>
                    <label htmlFor="patient">Paciente:</label>
                    <select id="patient" {...register("patient", { required: "Seleccione un paciente." })}>
                        <option value="">Seleccione un paciente</option>
                        {patients.map((patient) => (
                            <option key={patient.id} value={patient.id}>
                                {patient.full_name}
                            </option>
                        ))}
                    </select>
                    {errors.patient && <p className="error">{errors.patient.message}</p>}
                </div>

                <div>
                    <label htmlFor="doctor">Médico:</label>
                    <select id="doctor" {...register("doctor", { required: "Seleccione un médico." })}>
                        <option value="">Seleccione un médico</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.full_name}
                            </option>
                        ))}
                    </select>
                    {errors.doctor && <p className="error">{errors.doctor.message}</p>}
                </div>

                <input type="submit" value="Guardar" style={{ marginRight: '10px' }} />
            </form>
        </div>
    );
};

export default AppointmentFormPage;
