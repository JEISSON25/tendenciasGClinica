import { useEffect, useState } from 'react';
import { getPatients } from '../api/Clinica.api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function ListPatients() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        async function loadPatients() {
            const res = await getPatients();
            setPatients(res.data);
        }

        loadPatients();
    }, []);

    // Función para exportar la tabla como PDF en modo horizontal (landscape)
    const exportToPDF = () => {
        // Crear el documento PDF en orientación landscape
        const doc = new jsPDF('landscape');

        // Agregar título
        doc.setFontSize(18);
        doc.text('Listado de Pacientes', 14, 22);

        // Definir el ancho de las columnas
        const tableColumn = ["ID", "Nombre\nCompleto", "Teléfono", "Fecha\nNacimiento", "Dirección", "Género", "Email", "Nombre\nEmergencia", "Teléfono\nEmergencia", "Compañía\nSeguros", "Número\nPóliza", "Vigencia\nPóliza", "Estado\nPóliza"];
        const tableRows = [];

        // Preparar los datos de la tabla
        patients.forEach(patient => {
            const patientData = [
                patient.id,
                patient.nombre_completo,
                patient.telefono,
                new Date(patient.fecha_nacimiento).toLocaleDateString(),
                patient.direccion, 
                patient.genero,
                patient.email,
                patient.nombre_emergencia,
                patient.telefono_emergencia,
                patient.compañia_Seguros,
                patient.numero_poliza,
                new Date(patient.vigencia_poliza).toLocaleDateString(),
                patient.estado_poliza
            ];
            tableRows.push(patientData);
        });

        // Generar la tabla en el PDF
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            headStyles: { fontSize: 7 },  // Tamaño de la fuente para los encabezados
        bodyStyles: { fontSize: 7 },  // Tamaño de la fuente para el cuerpo de la tabla
        styles: {
            cellPadding: 1,  // Reducir el relleno de las celdas
        },
            columnStyles: {
                0: { cellWidth: 10 },  // Ajusta el ancho de la columna ID
                1: { cellWidth: 25 },  // Ajusta el ancho de la columna Nombre Completo
                2: { cellWidth: 20 },  // Teléfono
                3: { cellWidth: 22 },  // Fecha de Nacimiento
                4: { cellWidth: 25 },  // Dirección
                5: { cellWidth: 15 },  // Género
                6: { cellWidth: 25 },  // Email
                7: { cellWidth: 35 },  // Contacto de Emergencia
                8: { cellWidth: 25 },  // Teléfono Emergencia
                9: { cellWidth: 20 },  // Compañía de Seguros
                10: { cellWidth: 20 }, // Número de Póliza
                11: { cellWidth: 18 }, // Vigencia de Póliza
                12: { cellWidth: 15}, // Estado de Póliza
            },
            styles: { fontSize: 10, cellPadding: 3 },  // Ajusta el tamaño de fuente y padding
            theme: 'striped'  // Opción de tema para mejorar visibilidad
        });

        // Guardar el PDF
        doc.save('Listado_de_Pacientes.pdf');
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Listado de Pacientes</h2>
            <div className="table-responsive shadow-sm p-3 mb-5 bg-white rounded patients-table" id="patients-table">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre Completo</th>
                            <th>Teléfono</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Dirección</th>
                            <th>Género</th>
                            <th>Correo Electrónico</th>
                            <th>Contacto Emergencia</th>
                            <th>Teléfono Emergencia</th>
                            <th>Compañía Seguros</th>
                            <th>Número Póliza</th>
                            <th>Vigencia Póliza</th>
                            <th>Estado Póliza</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.nombre_completo}</td>
                                <td>{patient.telefono}</td>
                                <td>{new Date(patient.fecha_nacimiento).toLocaleDateString()}</td>
                                <td>{patient.direccion}</td>
                                <td>{patient.genero}</td>
                                <td>{patient.email}</td>
                                <td>{patient.nombre_emergencia}</td>
                                <td>{patient.telefono_emergencia}</td>
                                <td>{patient.compañia_Seguros}</td>
                                <td>{patient.numero_poliza}</td>
                                <td>{new Date(patient.vigencia_poliza).toLocaleDateString()}</td>
                                <td>{patient.estado_poliza}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-end mb-3">
                <button className="btn btn-primary btn-lg" onClick={exportToPDF}>
                    <i className="fas fa-file-export"></i> Exportar
                </button>
            </div>
        </div>
    );
}
