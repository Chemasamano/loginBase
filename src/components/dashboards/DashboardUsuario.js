import React from 'react';
import styles from './DashboardUsuario.module.css';

 const DashboardUsuario = ({ username }) => {
   return (
     <div>
       <h1 className="welcome-message">Bienvenido Usuario: {username}</h1> {/* Mensaje de bienvenida aquí */}
       <h2>Panel de Usuario</h2>
       {/* Contenido específico para usuarios */}
       <p>Bienvenido a tu panel de usuario.</p>
       {/* ... */}
     </div>
   );
 };

 export default DashboardUsuario;