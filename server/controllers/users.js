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

const userFavChar = async (userid, charid) => {
  return UsersFavChar.findOne({
    where: {
      userid,
      charid,
    },
  })
    .then((userFavChar) => {
      if (!userFavChar) {
        return UsersFavChar.create({
          charId: charid,
          userId: userid,
        })
          .then((userFavChar) => {
            return {
              status: 201,
              message: `Now you have a new favorite R&M character`,
            };
          })
          .catch((error) => {
            console.log('Error at user fav char: ', error);
            return { status: 500, message: error, error };
          });
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
            console.log(error);
            return {
              status: 500,
              message:
                'Ups! Something went wrong deleting this character from your favorite list',
            };
          });
      }
    })
    .catch((error) => {
      console.log('Error at user fav char: ', error);
      return { status: 500, message: error, error };
    });
};

module.exports = {
  getAllUsers,
  userFavChar,
};
