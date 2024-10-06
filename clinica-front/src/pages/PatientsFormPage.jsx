import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { createPatient, deletePatient, updatePatient, getPatient, getAllPatients } from '../api/patients.api';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function PatientsFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm(); 
    const navigate = useNavigate();
    const params = useParams();
    console.log(params);

    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    async function loadPatients() {
        const res = await getAllPatients(); 
        setPatients(res.data);
    }

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

    const filteredPatients = patients.filter(patient =>
        patient.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updatePatient(params.id, data);
            alert(`Se ha actualizado la información del paciente ${data.full_name} con éxito`);
        } else {
            await createPatient(data);
            alert(`Se ha creado el paciente ${data.full_name} con éxito`);
        }
        navigate('/patients');
    });

    useEffect(() => {
        async function loadPatient() {
            if (params.id) {
                const res = await getPatient(params.id);
                console.log(res);
                setValue("full_name", res.data.full_name);
                setValue("birth_date", res.data.birth_date);
                setValue("gender", res.data.gender);
                setValue("address", res.data.address);
                setValue("phone_number", res.data.phone_number);
                setValue("email", res.data.email);
                setValue("emergency_contact_name", res.data.emergency_contact_name);
                setValue("emergency_contact_phone", res.data.emergency_contact_phone);
                setValue("insurance_company", res.data.insurance_company);
                setValue("policy_number", res.data.policy_number);
                setValue("policy_status", res.data.policy_status);
                setValue("policy_expiry", res.data.policy_expiry);
            }
        }
        loadPatient();
    }, [params.id, setValue]);

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        const title = "Información del Paciente";
        doc.text(title, 14, 20);

        const data = [
            { Label: 'Nombre Completo', Value: getValues("full_name") },
            { Label: 'Fecha de Nacimiento', Value: getValues("birth_date") },
            { Label: 'Género', Value: getValues("gender") },
            { Label: 'Dirección', Value: getValues("address") },
            { Label: 'Número de Teléfono', Value: getValues("phone_number") },
            { Label: 'Correo Electrónico', Value: getValues("email") },
            { Label: 'Nombre del Contacto de Emergencia', Value: getValues("emergency_contact_name") },
            { Label: 'Teléfono del Contacto de Emergencia', Value: getValues("emergency_contact_phone") },
            { Label: 'Compañía de Seguro', Value: getValues("insurance_company") },
            { Label: 'Número de Póliza', Value: getValues("policy_number") },
            { Label: 'Estado de Póliza', Value: getValues("policy_status") },
            { Label: 'Fecha de Expiración de la Póliza', Value: getValues("policy_expiry") },
        ];

        // Agregar tabla al PDF
        doc.autoTable({
            head: [['Label', 'Value']],
            body: data.map(item => [item.Label, item.Value]),
            startY: 30,
            margin: { horizontal: 10 },
        });

        // Guardar PDF con nombre del paciente o 'nuevo_paciente'
        doc.save(`${getValues("full_name") || 'nuevo_paciente'}.pdf`);
    };

    return (
        <div>
            <h2>Formulario de Información Personal</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="full_name">Nombre Completo:</label>
                <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    {...register("full_name", { required: true })}
                />
                {errors.full_name && <span>Este campo es requerido!</span>}
                <br /><br />

                <label htmlFor="birth_date">Fecha de Nacimiento:</label>
                <input
                    type="date"
                    id="birth_date"
                    name="birth_date"
                    {...register("birth_date", { required: true })}
                />
                {errors.birth_date && <span>Este campo es requerido!</span>}
                <br /><br />

                <label htmlFor="gender">Género:</label>
                <select
                    id="gender"
                    name="gender"
                    {...register("gender", { required: true })}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                    <option value="O">Otro</option>
                </select>
                {errors.gender && <span>Este campo es requerido!</span>}
                <br /><br />

                <label htmlFor="address">Dirección:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    {...register("address", { required: true })}
                />
                {errors.address && <span>Este campo es requerido!</span>}
                <br /><br />

                <label htmlFor="phone_number">Número de Teléfono:</label>
                <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    {...register("phone_number", { required: true })}
                />
                {errors.phone_number && <span>Este campo es requerido!</span>}
                <br /><br />

                <label htmlFor="email">Correo Electrónico:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    {...register("email", { required: true })}
                />
                {errors.email && <span>Este campo es requerido!</span>}
                <br /><br />

                <h3>Contacto de Emergencia</h3>

                <label htmlFor="emergency_contact_name">Nombre del Contacto de Emergencia:</label>
                <input
                    type="text"
                    id="emergency_contact_name"
                    name="emergency_contact_name"
                    {...register("emergency_contact_name", { required: true })}
                />
                {errors.emergency_contact_name && <span>Este campo es requerido!</span>}
                <br /><br />

                <label htmlFor="emergency_contact_phone">Teléfono del Contacto de Emergencia:</label>
                <input
                    type="tel"
                    id="emergency_contact_phone"
                    name="emergency_contact_phone"
                    {...register("emergency_contact_phone", { required: true })}
                />
                {errors.emergency_contact_phone && <span>Este campo es requerido!</span>}
                <br /><br />

                <h3>Información de Seguro</h3>

                <label htmlFor="insurance_company">Compañía de Seguro:</label>
                <input
                    type="text"
                    id="insurance_company"
                    name="insurance_company"
                    {...register("insurance_company", { required: true })}
                />
                {errors.insurance_company && <span>Este campo es requerido!</span>}
                <br /><br />

                <label htmlFor="policy_number">Número de Póliza:</label>
                <input
                    type="text"
                    id="policy_number"
                    name="policy_number"
                    {...register("policy_number", { required: true })}
                />
                {errors.policy_number && <span>Este campo es requerido!</span>}
                <br /><br />

                <label htmlFor="policy_status">Estado de Póliza:</label>
                <select
                    id="policy_status"
                    name="policy_status"
                    {...register("policy_status", { required: true })}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="V">Vigente</option>
                    <option value="C">Caducada</option>
                </select>
                {errors.policy_status && <span>Este campo es requerido!</span>}
                <br /><br />

                <label htmlFor="policy_expiry">Fecha de Expiración de la Póliza:</label>
                <input
                    type="date"
                    id="policy_expiry"
                    name="policy_expiry"
                    {...register("policy_expiry", { required: true })}
                />
                {errors.policy_expiry && <span>Este campo es requerido!</span>}
                <br /><br />

                <button type="submit" className="bg-purple-800 text-white p-2 rounded hover:bg-purple-700">
                    Guardar
                </button>
                <button type="button" className="bg-purple-800 text-white p-2 rounded hover:bg-purple-700" onClick={exportToPDF}>
                    Exportar a PDF
                </button>
            </form>


        </div>
    );
}
