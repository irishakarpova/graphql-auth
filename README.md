# GraphQL Authorization

#### Steps to run this project:

1. Create DataBase

- Create PostgreSQL database: "ultratest"
- Add table for database with fields: username: "admin", password: "admin",

2. Move the folder server and make a backend server available:

- Install dependencies by running an npm install command.
- Create .env file with 2 variables:
  ACCESS_TOKEN_SECRET=accesssecret
  REFRESH_TOKEN_SECRET=refreshsecret
- Run server with npm run start

3. To run the front-end move the directory react-webpack

- Install dependencies by running an npm install command.
- Create .env file with 2 variables:
  GRAPHQL_QUERY = http://localhost:4000/graphql
  REFRESH_TOKEN = http://localhost:4000/refresh
- Run development server with npm run start