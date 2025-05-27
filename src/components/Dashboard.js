import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logout as logoutAction } from '../actions/authActions'; // Importa tu acción de logout
import DashboardAdministrador from './dashboards/DashboardAdministrador';
import DashboardSupervisor from './dashboards/DashboardSupervisor';
import DashboardUsuario from './dashboards/DashboardUsuario';
import '../components/Dashboard.css';
import '../components/DashboardMenu.css';
import logo from '../img/logo.jpg';
import DashboardMenu from '../components/DashboardMenu'; // Importa el componente del menú

const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Obtén la información del usuario desde el estado de Redux
    const user = useSelector(state => state.auth.user);
    

    const handleLogout = async () => {
        // Obtén el token del estado de Redux (si está disponible) o del localStorage
        const token = user?.token || localStorage.getItem('loggedInUser')?.token;

        if (!token) {
            console.error('No se encontró el token de sesión.');
            navigate('/');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sesionToken: token }), // Utiliza el token obtenido del estado o localStorage
            });

            if (response.ok) {
                console.log('Cierre de sesión exitoso.');
                dispatch(logoutAction()); // Despacha tu acción de logout de Redux
                localStorage.removeItem('loggedInUser'); // Limpia la información del usuario de localStorage
                navigate('/');
            } else {
                console.error('Error al cerrar sesión:', response.status);
            }
        } catch (error) {
            console.error('Error de conexión al cerrar sesión:', error);
        }
    };

    if (!user?.username) {
        return <div>Cargando...</div>; // O algún otro indicador de carga
    }

    console.log('Información del usuario en Dashboard:', user);

    let dashboardContent;

    //if (user.roles && user.roles.includes('Administrador')) {
    if (user?.roles?.includes('Administrador')) {
        dashboardContent = <DashboardAdministrador />;
    } else if (user?.roles?.includes('Supervisor')) {
        dashboardContent = <DashboardSupervisor />;
    } else if (user?.roles?.includes('Usuario')) {
        dashboardContent = <DashboardUsuario />;
    } else {
        dashboardContent = <div>Rol no reconocido o no asignado.</div>; // Manejo de roles desconocidos
    }

    return (
        <div className="dashboard-layout">
             <header className="dashboard-menu">
                <img src={logo} alt="Logo" className="logo-image"/>
                {user?.menu && <DashboardMenu menu={user.menu} />} {/* Renderiza DashboardMenu solo si user.menu existe */}
                <div className="logout-container">
                    <button onClick={handleLogout} className="btn btn-danger logout-button">Cerrar Sesión</button>
                </div>
                 
                {/* Otros elementos comunes del header */}
             </header>
             <div className="main-content">                
                {dashboardContent} {/* Renderiza el contenido específico del rol */}
             </div>
             <footer>
                 {/* Footer común si lo tienes */}
             </footer>
         </div>
    );
};

export default Dashboard;