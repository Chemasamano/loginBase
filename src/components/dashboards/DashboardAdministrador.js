import React from 'react';
import styles from './DashboardAdministrador.module.css';

const DashboardAdministrador = ({ username }) => {
    return (
      <div>
        <h1 className="welcome-message">Bienvenido Administrador: {username}</h1> {/* Mensaje de bienvenida aquí */}
        <h2>Panel de Administración</h2>
        {/* Contenido específico para administradores */}
        <ul>
          <li>Gestionar Usuarios</li>
          <li>Ver Reportes del Sistema</li>
          {/* ... */}
        </ul>
      </div>
    );
  };

export default DashboardAdministrador;