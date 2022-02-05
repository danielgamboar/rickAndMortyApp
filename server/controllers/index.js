const characterController = require('./characters');
const usersController = require('./users');
const authController = require('./auth');
const { registerValidator, loginValidator } = require('../helpers/validation');

exports.registerUser = async (req, res) => {
  let response = null;
  //Running validations to the request body
  const { error } = registerValidator(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  response = await authController.registerUser(req.body);
  return res.status(response.status).send(response);
};

exports.loginUser = async (req, res) => {
  let response = null;
  //Run body parameters through the validation schema
  const { error } = loginValidator(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  response = await authController.loginUser(req.body);

  return res.header('auth-token', response.auth_token).send(response);
};

exports.getAllCharacters = async (req, res) => {
  let response = null;

  response = await characterController.getAllCharacters(req.params.page || 1);

  return res.status(response.status).send(response);
};

exports.getCharacterById = async (req, res) => {
  let response = null;
  response = await characterController.getCharacterById(req.params.id);

  return res.status(response.status).send(response);
};

exports.getAllUsersFavChars = async (req, res) => {
  let response = null;

  response = await usersController.getAllUsersFavChars(req.user.id);

  return res.status(response.status).send(response);
};

exports.getCurrentUser = async (req, res) => {
  let response = null;

  response = await usersController.getCurrentUser(req.user.id);

  return res.status(response.status).send(response);
};

exports.postUserFavChar = async (req, res) => {
  let response = null;
  if (!req.user.id) {
    return res.status(400).send({ error: 'No valid user ID was provided.' });
  }
  if (!req.body.charId) {
    return res
      .status(400)
      .send({ error: 'No valid character ID was provided.' });
  }

  response = await usersController.userFavChar(req.user.id, req.body.charId);

  return res.status(response.status).send(response);
};
