# react-express-passport-postgres

Auth with Passport Local with login and registering users. Front end with React and database using Postgres with MassiveJS.

This project uses

* Create-React-App
* React Router v4
* Redux
* Redux Thunk
* Axios
* Express
* Express session
* Passport local
* Postgres
* MassiveJS

## Installation
First [**yarn**](https://yarnpkg.com/en/) must be installed globally. <br/>
Make sure to have a `.env` file, following the `env.sample`, with your postgres URI to your database. In the database, run the `setup.sql`, to get a table for users. <br/> 
In the terminal of this project's root directory, run `yarn` and `yarn run build` commands.

To run in development mode with live-reloading for express and create-react-app, run `yarn run dev`. <br/>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To run in production mode, run `yarn run prod`. <br/>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
