# GraphQL JWT Authorization and Authentication

#### Steps to run this project:

1. Create a local PostgreSQL Database named "ultratest"

<details><summary><em>How to install PostgreSQL database?</em></summary>
<p>
   
  - Install Homebrew (https://brew.sh/) or run the command in terminal `brew -v` to make sure Brew installed.
  - Run the command `brew install postgresql`, thenof it is not started `brew services start`
  - To create user and password run command `CREATE ROLE <app_user> WITH LOGIN PASSWORD <app_password>;`
  - To create database use command `CREATE DATEBASE <app_database>;`
  - To connect to database use commant `\connect <app_database>;`

</p>
</details>

2. Move the folder server and make a backend server available:

- Install dependencies by running `npm install` command.
- Create .env file with 2 variables:
  `ACCESS_TOKEN_SECRET=<accesssecret>`
  `REFRESH_TOKEN_SECRET=<refreshsecret>`
- Run `npm run start`

<details><summary><em>The concept of building GraphQL APIs with TypeGraphQL and TypeORM.</em></summary>
<p>
   
The main goal of using the tools is to unify and simplify the work with the database and GraphQL schema with further processing to resolvers in one place. TypeORM library gets data from a database and maps tables to model classes, TypeGraphQL generates a GraphQL schema into classes with Typescript and allows us toprocess resolvers in one place.

Here, we are installing:

- TypeORM library using CLI
 - install global version `npm i -g typeorm`
 - initialize a new TypeORM project `init --name <folder_name> --database postgres`

</p>
</details>

3. To run the front-end move to the directory react-webpack

- Install dependencies by running npm install command.
- Create .env file with 2 variables:
  `GRAPHQL_QUERY = http://localhost:4000/graphql`
  `REFRESH_TOKEN = http://localhost:4000/refresh`

- Run development server with `npm run start`
