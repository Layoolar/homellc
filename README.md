# Table of content

- [Description](#description)
- [Capabilities](#capabilities)
- [Extra Features](#extra-features)
- [Demo](#demo)
- [NPM start](#npm-start)
- [NPM run client](#npm-run-client)
- [NPM run server](#npm-run-server)
- [Node index.js](#node-indexjs)
- [Database Configuration](#database-configuration)

### Description

A login and registration project using the MERN Stack

This project is an admin dashboard for a loan company where admin can manage users.

This project was bootstrapped with these

[React App](https://reactjs.org/),

[Redux](https://redux.js.org/)

[Typescript](https://www.typescriptlang.org/)

[Sass](https://sass-lang.com/)

[Node](https://nodejs.org)

[Expressjs](https://expressjs.com/)

[Mongodb](https://mongodb.com/)

This is a project to create for [Home LLC](home.llc)

Some of the other technologies used:

- [React Router](https://github.com/remix-run/react-router)
- [Axios](https://github.com/axios/axios)
- [Bcrypt](github.com/kelektiv/node.bcrypt.js)
- [Jsonwebtoken](github.com/auth0/node-jsonwebtoken)

##### About HomeLLC

Home LLC is solving the homeownership crisis to tackle income inequality in America.
They provide debt-free capital to home buyers and home owners in exchange for sharing a small part of their future appreciation. This way, everyday people as well as investors can build wealth together.

They are extremely data-driven while constantly seeking new perspectives to refine our thesis.

### Capabilities

- a login form with two input fields: (Email and Password).
- The details input by the User should be matched against the details present in the Database.
- New users are be able to sign up by entering Email, password, First and Last name. Their details is saved in the DB.
- All emails are unique in DB
- After logging in, the user is able to see the home page:
  a. Home page has a top navigation bar with a search input field, logged in user first + last name (taken from DB), and a logout button
  b. The home page has a left navigation menu that does not move on scrolling vertically.

### Extra Features

- Password is encrypted before being saved in the database
- Encryption Key and DB connection string is saved as environment variables.
- A token is sent and sent for identification
- Rate limiting to avoid bruteforce attacks

### Demo

[video](https://www.loom.com/share/de0e26662b914f7b97007a713459b02a)

### NPM start

Starts the server and client with 'npm run dev'
Starts both the server and client concurrently in development mode
Open [http://localhost:3000](http://localhost:3000)

### NPM run client

Starts the client.
Runs the client in the development mode.
Open [http://localhost:3000](http://localhost:3000)

### NPM run server

Starts the server with 'nodemon server/index.js'
Runs the server on development mode
Test the API with [http://localhost:1338](http://localhost:1338)

### Database Configuration

Change Mongodb connection string in the .env file at the root.
