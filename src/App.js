import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import LoginForm from './components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BackgroundWrapper from './components/BackgroundWrapper';

function App() {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <BackgroundWrapper>
          <div className="container">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Otras rutas de tu aplicación irían aquí */}
              <Route path="/" element={<LoginForm />} /> {/* Ruta por defecto */}
            </Routes>          
          </div>
        </BackgroundWrapper>
      </BrowserRouter>      
    </Provider>

  );
}

export default App;
