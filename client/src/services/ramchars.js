/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:4001/api';

const getAllChars = (page) => {
  return axios
    .get(API_BASE_URL + `/characters/${page}`, { headers: authHeader() })
    .then((response) => {
      if (response.data.status === 200) {
        return response.data.data;
      }
    });
};

const getCharById = (id) => {
  return axios
    .get(API_BASE_URL + `/characters/${id}`, { headers: authHeader() })
    .then((response) => {
      if (response.data.status === 200) {
        return response.data.data;
      }
    });
};

const favOrUnfavChar = (charId) => {
  return axios
    .post(
      API_BASE_URL + `/user/favchar`,
      { charId: charId },
      { headers: authHeader() }
    )
    .then((response) => {
      console.log('fav unfav reponse: ', response);
      if (response.data.status === 201 || response.data.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log('user fav char eror', error);
      return {};
    });
};

const getUsersFavChars = () => {
  return axios
    .get(API_BASE_URL + `/user/favs`, { headers: authHeader() })
    .then((response) => {
      let charIDs = [];
      if (response.data.status === 200) {
        charIDs = response.data.data.map((char) => char.charId);
        return charIDs;
      }
    });
};

export default {
  favOrUnfavChar,
  getCharById,
  getAllChars,
  getUsersFavChars,
};
