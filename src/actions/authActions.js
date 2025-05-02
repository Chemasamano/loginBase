export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData, // userData ahora contendrá token, roles y menu
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
  
export const logout = () => ({
    type: LOGOUT,
});

export const login = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(loginFailure(errorData.message || 'Error en el inicio de sesión'));
      return;
    }

    const data = await response.json();
    localStorage.setItem('loggedInUser', JSON.stringify(data)); // Guarda toda la info del usuario
    dispatch(loginSuccess(data)); // Despacha toda la data (incluyendo el menú)
  } catch (error) {
    dispatch(loginFailure('Error de conexión'));
  }
};