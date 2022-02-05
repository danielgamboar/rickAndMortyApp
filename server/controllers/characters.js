const axios = require('axios');

const getAllCharacters = async (page = 1) => {
  let data = null;

  let response = await axios.get(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  data = {
    status: response.status,
    data: response.data,
  };

  return data;
};

const getCharacterById = async (id) => {
  let data = null;

  let response = await axios.get(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  data = {
    status: response.status,
    data: response.data,
  };

  return data;
};

module.exports = {
  getAllCharacters,
  getCharacterById,
};
