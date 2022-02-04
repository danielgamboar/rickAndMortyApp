import axios from 'axios';
// import config from 'dotenv';
// config.config();

const API_BASE_URL = 'http://localhost:4001/api';

const login = (email, password) => {
  return axios
    .post(API_BASE_URL + '/auth/login', {
      email,
      password,
    })
    .then((response) => {
      console.log('login service reponse: ', response.data);
      if (response.data.status === 200) {
        localStorage.setItem('auth-token', response.data.auth_token);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('auth-token');
};

const register = (fullName, email, password) => {
  return axios
    .post(API_BASE_URL + '/auth/register', {
      fullName,
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

export default {
  register,
  login,
  logout,
};
