import axios from 'axios';
import authHeader from './auth-header';
// import config from 'dotenv';
// config.config();

const API_BASE_URL = process.env.API_BASE_URL;

const getAllChars = () => {
  axios
    .get(API_BASE_URL + '/characters', { headers: authHeader() })
    .then((response) => {
      if (response.data.status === 200) {
        return response.data.data;
      }
    });
};

const getCharById = (id) => {
  axios
    .get(API_BASE_URL + `/characters/${id}`, { headers: authHeader() })
    .then((response) => {
      if (response.data.status === 200) {
        return response.data.data;
      }
    });
};

const favOrUnfavChar = (userId, charId) => {
  axios
    .post(
      API_BASE_URL + `/users/favchar`,
      { headers: authHeader() },
      { userId, charId }
    )
    .then((response) => {
      if (response.data.status === 200) {
        return response.data.data;
      }
    });
};

export default {
  favOrUnfavChar,
  getCharById,
  getAllChars,
};
