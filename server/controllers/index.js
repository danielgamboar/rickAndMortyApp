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
  console.log('@@@@@@@@@@@@ USER FROM HEADER: ', req.user);

  response = await characterController.getAllCharacters();

  return res.status(response.status).send(response);
};

exports.getCharacterById = async (req, res) => {
  let response = null;
  console.log('request params: ', req.params);

  response = await characterController.getCharacterById(req.params.id);

  return res.status(response.status).send(response);
};

exports.getAllUsers = async (req, res) => {
  let response = null;

  response = await usersController.getAllUsers();

  return res.status(response.status).send(response);
};

exports.postUserFavChar = async (req, res) => {
  let response = null;
  if (!req.body.userId) {
    return res.status(400).send({ error: 'No valid user ID was provided.' });
  }
  if (!req.body.char.id) {
    return res
      .status(400)
      .send({ error: 'No valid character ID was provided.' });
  }

  response = await usersController.userFavChar(req.body.userId, req.body.char);

  return res.status(response.status).send(response);
};

exports.deleteUserFavChar = async (req, res) => {
  let response = null;
  if (!req.body.userId) {
    return res.status(400).send({ error: 'No valid user ID was provided.' });
  }
  if (!req.body.charId) {
    return res
      .status(400)
      .send({ error: 'No valid character ID was provided.' });
  }

  response = await usersController.userUnfavChar(
    req.body.userId,
    req.body.charId
  );

  return res.status(response.status).send(response);
};
