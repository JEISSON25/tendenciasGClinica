import { useEffect, useState } from 'react';
import { getUsers } from '../api/Clinica.api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function ListUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const res = await getUsers();
            setUsers(res.data);
        }

        loadUsers();
    }, []);

   
    const exportToPDF = () => {
        const doc = new jsPDF();

    
        doc.setFontSize(18);
        doc.text('Listado de Usuarios', 14, 22);

        
        const tableColumn = ["ID", "Nombre", "Apellidos", "Dirección", "Rol", "Email", "Teléfono", "Especialidad"];
        const tableRows = [];

        
        users.forEach(user => {
            const userData = [
                user.id,
                user.nombres,
                user.apellidos,
                user.direccion,
                user.rol,
                user.email,
                user.telefono,
                user.especialidad,
            ];
            tableRows.push(userData);
        });

        
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            headStyles: { fontSize: 7 },
            bodyStyles: { fontSize: 7 },
            styles: { cellPadding: 1 },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 25 },
                2: { cellWidth: 25 },
                3: { cellWidth: 20 },
                4: { cellWidth: 25 },
                5: { cellWidth: 20 },
                6: { cellWidth: 20 },
                7: { cellWidth: 25 },
            },
            styles: { fontSize: 10, cellPadding: 3 },
            theme: 'striped'
        });

       
        doc.save('Listado_de_Usuarios.pdf');
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Listado de Usuarios</h2>
            <div className="table-responsive shadow-sm p-3 mb-5 bg-white rounded users-table" id="users-table">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Dirección</th>
                            <th>Rol</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Especialidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nombres}</td>
                                <td>{user.apellidos}</td>
                                <td>{user.direccion}</td>
                                <td>{user.rol}</td>
                                <td>{user.email}</td>
                                <td>{user.telefono}</td>
                                <td>{user.especialidad}</td>
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
