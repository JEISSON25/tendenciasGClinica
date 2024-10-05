import React, { useEffect, useState } from 'react';
import { getPatients, updatePatient, deletePatient } from '../api/Clinica.api';

export function UpdatePatients() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre_completo: '',
        fecha_nacimiento: '',
        genero: '', 
        direccion: '',
        telefono: '',
        email: '',
        nombre_emergencia: '',
        telefono_emergencia: '',
        compañia_Seguros: '',
        numero_poliza: '',
        estado_poliza: 'A',
        vigencia_poliza: '',
    });
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        const loadPatients = async () => {
            try {
                const response = await getPatients();
                setPatients(response.data);
            } catch (error) {
                console.error('Error al cargar pacientes:', error);
            }
        };

        loadPatients();
    }, []);

    const handleEditClick = (patient) => {
        setSelectedPatient(patient);
        setFormData({
            nombre_completo: patient.nombre_completo,
            fecha_nacimiento: patient.fecha_nacimiento,
            genero: patient.genero, 
            direccion: patient.direccion,
            telefono: patient.telefono,
            email: patient.email,
            nombre_emergencia: patient.nombre_emergencia,
            telefono_emergencia: patient.telefono_emergencia,
            compañia_Seguros: patient.compañia_Seguros,
            numero_poliza: patient.numero_poliza,
            estado_poliza: patient.estado_poliza,
            vigencia_poliza: patient.vigencia_poliza,
        });
        setIsEditing(true);
        setUpdateMessage('');
    };

    const handleDeleteClick = async (id) => {
        try {
            await deletePatient(id);
            setPatients(patients.filter(patient => patient.id !== id));
        } catch (error) {
            console.error('Error al eliminar el paciente:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };

        if (name === 'vigencia_poliza') {
            const today = new Date();
            const vigenciaDate = new Date(value);
            updatedFormData.estado_poliza = vigenciaDate > today ? 'A' : 'I';
        }

        setFormData(updatedFormData);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPatient = await updatePatient(selectedPatient.id, formData);
            setPatients(patients.map(patient => (patient.id === updatedPatient.id ? updatedPatient : patient)));
            setUpdateMessage('Paciente actualizado correctamente.');
            setIsEditing(false);
            setSelectedPatient(null);
            setFormData({
                nombre_completo: '',
                fecha_nacimiento: '',
                genero: '', 
                direccion: '',
                telefono: '',
                email: '',
                nombre_emergencia: '',
                telefono_emergencia: '',
                compañia_Seguros: '',
                numero_poliza: '',
                estado_poliza: 'A',
                vigencia_poliza: '',
            });
        } catch (error) {
            console.error('Error al actualizar el paciente:', error);
            setUpdateMessage('Error al actualizar el paciente.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Listado de Pacientes</h2>
            <div className="table-responsive shadow-sm p-3 mb-5 bg-white rounded" id="patients-table">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre Completo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.length > 0 ? (
                            patients.map(patient => (
                                <tr key={patient.id}>
                                    <td>{patient.id}</td>
                                    <td>{patient.nombre_completo}</td>
                                    <td>
                                        <button style={{ backgroundColor: '#7dcea0', color: 'white', marginRight: '10px' }} onClick={() => handleEditClick(patient)}>Actualizar</button>
                                        <button style={{ backgroundColor: '#e74c3c ', color: 'white', marginRight: '10px' }} onClick={() => handleDeleteClick(patient.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No hay pacientes disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isEditing && (
                <div className="mt-4">
                    <h3>Editar Paciente</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre Completo</label>
                            <input type="text" className="form-control" name="nombre_completo" value={formData.nombre_completo} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fecha de Nacimiento</label>
                            <input type="date" className="form-control" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Género</label>
                            <select className="form-control" name="genero" value={formData.genero} onChange={handleInputChange} required>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input type="text" className="form-control" name="direccion" value={formData.direccion} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input type="text" className="form-control" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contacto de Emergencia</label>
                            <input type="text" className="form-control" name="nombre_emergencia" value={formData.nombre_emergencia} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfono de Emergencia</label>
                            <input type="number" className="form-control" name="telefono_emergencia" value={formData.telefono_emergencia} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Compañia de Seguros</label>
                            <input type="text" className="form-control" name="compañia_seguros" value={formData.compañia_Seguros} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Número de Póliza</label>
                            <input type="number" className="form-control" name="numero_poliza" value={formData.numero_poliza} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Vigencia de Póliza</label>
                            <input type="date" className="form-control" name="vigencia_poliza" value={formData.vigencia_poliza} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Estado de Póliza</label>
                            <select className="form-control" name="estado_poliza" value={formData.estado_poliza} readOnly>
                                <option value="A">Activa</option>
                                <option value="I">Inactiva</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">Actualizar Paciente</button>
                    </form>
                    {updateMessage && <div className="alert alert-success mt-3">{updateMessage}</div>}
                </div>
            )}
        </div>
    );
}
