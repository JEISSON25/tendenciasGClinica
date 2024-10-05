import React from 'react';
import { Link } from 'react-router-dom';

export function ManageUsers() {
    return (
        <div className="container">
            <h2 style={{ marginBottom: '30px' }}>Gestión de Usuarios</h2>
            <div className="btn-group" role="group" aria-label="Usuarios" style={{ display: 'flex', gap: '10px' }}>
                <Link to="/add-user" className="btn" style={{ backgroundColor: '#A8E6CF', color: '#004D40', borderRadius: '20px', padding: '10px 20px' }}>Agregar Usuarios</Link>
                <Link to="/update-user" className="btn" style={{ backgroundColor: '#DCEDC8', color: '#33691E', borderRadius: '20px', padding: '10px 20px' }}>Actualizar o Eliminar Usuarios</Link>
                <Link to="/list-user" className="btn" style={{ backgroundColor: '#AED581', color: '#558B2F', borderRadius: '20px', padding: '10px 20px' }}>Listar Usuarios</Link>
            </div>
        </div>
    );
}
