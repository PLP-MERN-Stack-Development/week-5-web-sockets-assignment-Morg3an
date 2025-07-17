import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUser, registerUser } from '../api/auth';

export const useAuth = () => {
  const { user, token, login, logout } = useContext(AuthContext);

  const loginUserHandler = async (email, password) => {
    try {
      const res = await loginUser({ email, password });
      login(res.user, res.token);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      throw err;
    }
  };

  const registerUserHandler = async (username, email, password) => {
    try {
      const res = await registerUser({ username, email, password });
      login(res.user, res.token);
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
      throw err;
    }
  };

  return {
    user,
    token,
    login: loginUserHandler,
    register: registerUserHandler,
    logout,
  };
};