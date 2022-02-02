const Users = require('../models').Users;
const UsersFavChar = require('../models').users_fav_chars;

const getAllUsers = async () => {
  let data = null;

  let response = await Users.findAll({ include: [{ model: UsersFavChar }] });

  if (response.lenght != 0) {
    data = {
      status: 200,
      data: response,
    };
  } else {
    data = {
      status: 404,
      data: response,
    };
  }
  return data;
};

const userFavChar = async (userid, char) => {
  return Users.findOne({
    where: {
      id: userid,
    },
  })
    .then((user) => {
      return UsersFavChar.create({
        charId: char.id,
        userId: user.id,
      }).then((userFavChar) => {
        return {
          status: 201,
          message: `Now you have a new favorite R&M character: ${char.name}`,
        };
      });
    })
    .catch((error) => {
      return { status: 500, message: error.errors.message, error };
    });
};

const userUnfavChar = async (userid, charid) => {
  return UsersFavChar.findOne({
    where: {
      charId: charid,
      userId: userid,
    },
  })
    .then((userFavChar) => {
      if (!userFavChar) {
        return {
          status: 500,
          message: "You don't have this character in his favorite list.",
        };
      } else {
        return userFavChar
          .destroy()
          .then(() => {
            return {
              status: 200,
              message: 'This character was delete from your favorites list.',
            };
          })
          .catch((error) => {
            return {
              status: 500,
              message:
                'Ups! Something went wrong deleting this character from your favorite list',
            };
          });
      }
    })
    .catch((error) => {
      return { status: 500, message: error.errors.message, error };
    });
};

module.exports = {
  getAllUsers,
  userFavChar,
  userUnfavChar,
};
