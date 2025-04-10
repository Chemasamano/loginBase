// DashboardAdministrador.js
import React from 'react';
import styles from './DashboardAdministrador.module.css';

const DashboardAdministrador = () => {
    return (
      <div>
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