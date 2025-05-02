
import { LOGIN_SUCCESS, LOGOUT } from '../actions/authActions'; // Importa las constantes de las acciones

const initialState = {
    isAuthenticated: false,
    user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          menu: action.payload.menu, // Extrae la propiedad 'menu' del payload
        };
      case LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;