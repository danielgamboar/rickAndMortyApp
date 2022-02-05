const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Users = require('../models').Users;

const registerUser = async (body) => {
  //Search for an existing user with the supplied email - to make sure same email is only used once
  const emailExists = await Users.findOne({ where: { email: body.email } });
  if (emailExists)
    return {
      status: 400,
      message: 'An User account with this email already exists',
    };

  //Hash the password with bcrypt and a generated salt.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const newUser = {
    fullName: body.fullName,
    email: body.email,
    password: hashedPassword,
  };

  //Save the new user object, using the User model we defined in Sequelize. Return the new user ID in JSON
  return Users.create(newUser)
    .then((savedUser) => {
      return {
        status: 200,
        message: 'You were successfully registered.',
      };
    })
    .catch((err) => {
      return {
        status: 500,
        message: error.errors.message,
        error,
      };
    });
};

const loginUser = async (body) => {
  //Check if the email address exists in database. If not, reject the login
  const user = await Users.findOne({ where: { email: body.email } });
  if (!user) return { status: 400, message: 'Email is not correct' };

  //Check if pasword is correct using bcrpyt to compare to the stored hash. If they don't match, reject the login
  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) return { status: 400, message: 'Invalid password' };

  //Create + Assign a JWT token with a 10 minute expiry
  const token = jwt.sign(
    {
      id: user.id,
      name: user.fullName,
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
    },
    process.env.TOKEN_SECRET
  );

  //Return the token in a header called 'auth-token'. Add auth-token to any future requests to protected routes
  return {
    status: 200,
    message: 'You have been logged in successfully',
    auth_token: token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
