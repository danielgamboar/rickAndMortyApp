# Rick and Morty App!

#### Developed by: Daniel Gamboa

This full stack app was develped with:
React on the frontend, and this libraries:
| NPM package | Description |
| ------ | ------ |
| Axios | For HTTP request to the Node/Express server |
| react-router-dom | Used for the routing of the app |
| Redux | To handle the global state of the appp |

On the backend side, Node and Express, and Sqlite as the database, also with:
| NPM package | Description |
| ------ | ------ |
| Axios | For HTTP request to the Rick and Morty API |
| bcryptjs | To encrypt the passwords |
| dotenv | With this library the server can read the Json Web Token secret key |
| Joi | For data validation |
| jsonwebtoken | For user authentication porpuses |
| morgan | With this, we can see a log of the requests on the server console |
| sequelize, sequelize-cli | To make use of Sequelize, the ORM |
| sqlite3 | As the database dialect (required by Sequelize) |

## Installation

This apps requires [Node.js](https://nodejs.org/) vv14.16.1+ to run.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/danielgamboar/rickAndMortyApp.git
cd rickAndMortyApp
cd server -> Here change the .env.example file name to .env
cd .. -> to go back to the root of the project
npm run setup
npm run start
```

> **npm run setup** will install backend and frontend dependencies, also run database migration and seeds.
> **npm run start** will concurrently start bothe sides of the project.

## Test User Credentials

**email:** haufe@test.com
**pasword:** haufeteam

## API routes

| Route                 | Method | Description                                                                                                                            |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| /api/characters/:page | GET    | Retrieves 20 Rick and Morty characters per page. [page] is a number                                                                    |
| /api/user/favs        | GET    | Return all the characters that are on the user's favorite list                                                                         |
| /api/char/:id         | GET    | The server provides the data for the character with the [id] procvided on the URL                                                      |
| /api/user/current     | GET    | Get the user's data                                                                                                                    |
| /api/user/favchar     | POST   | Adds a character to the user's favorite list. We must provide the character id as [charId]                                             |
| /api/auth/register    | POST   | With this route we can register new users. We need to provide a full name [fullName], email [email], and password [password]           |
| /api/auth/login       | POST   | This handles the login and authentication process. We need to add to the request payload the email [email] and the password [password] |

## Frontend routes

| Route     | Description                                                                     |
| --------- | ------------------------------------------------------------------------------- |
| /         | This is the home page. Authentication is required                               |
| /login    | A public route that provide a login form                                        |
| /register | A public view shows a register form                                             |
| /char/:id | With this URL we can see a characters details view. This require authentication |
| /404      | A 404 error handlgin view                                                       |
