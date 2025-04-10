import React from 'react';
import styles from './DashboardSupervisor.module.css';

const DashboardSupervisor = () => {
    return (
      <div>
        <h2>Panel de Supervisor</h2>
       {/* Contenido específico para supervisores */}
       <ul>
         <li>Supervisar Actividades</li>
         <li>Aprobar Solicitudes</li>
         {/* ... */}
       </ul>
      </div>
    );
  };

  export default DashboardSupervisor;