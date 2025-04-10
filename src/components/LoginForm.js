import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../actions/authActions';
import '../stilos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpia cualquier error previo

    if (!username.trim()) {
      setError('El nombre de usuario es obligatorio.');
      return;
    }

    if (!password.trim()) {
      setError('La contraseña es obligatoria.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario: username, password: password }),
      });

      if (response.ok) {
          const data = await response.json();
          // Almacenar usuario, token y roles en el estado de la aplicación (Redux)
          const loggedInUser = { username: username, token: data.token, roles: data.roles };
          console.log('Usuario logueado:', loggedInUser); // Mostrar en consola

          // Despachar la acción para Redux
          dispatch(loginSuccess(loggedInUser));

          // Guardar una versión simplificada del usuario en localStorage (sin roles sensibles)
          localStorage.setItem('loggedInUser', JSON.stringify({ username: username, token: data.token }));

          console.log('Inicio de sesión exitoso:', data);
          
          navigate('/dashboard'); // Redirecciona a la página de bienvenida
      } else {
          setError('Error en la autentificación. Credenciales incorrectas.');
          console.error('Error en la autenticación:', response.status);
      }
    } catch (error) {
      setError('Error de conexión con el servidor.');
      console.error('Error al iniciar sesión:', error);
    }
    
  };

  return (
    <div className="login-container">
      <div className="cuadrado1"></div>
      <div className="cuadrado2"></div>
      <div className="cuadrado3"></div>
      <div className="login-form">
        <h2 className="text-center mb-4">Inicia Sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Muestra el mensaje de error */}
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;