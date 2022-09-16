# GraphQL JWT Authorization and Authentication

#### Steps to run this project:

1. Create a local PostgreSQL Database named "ultratest"

<details><summary><bold>How to create PostgreSQL database?</bold></summary>
<p>

   Install Homebrew (https://brew.sh/) or run the command in terminal `brew -v` to make sure Brew installed
</p>
</details>


2. Move the folder server and make a backend server available:

- Install dependencies by running `npm install` command.
- Create .env file with 2 variables:
  `ACCESS_TOKEN_SECRET=accesssecret`
  `REFRESH_TOKEN_SECRET=refreshsecret`

- Run npm run start

3. To run the front-end move the directory react-webpack

- Install dependencies by running npm install command.
- Create .env file with 2 variables:
  `GRAPHQL_QUERY = http://localhost:4000/graphql`
  `REFRESH_TOKEN = http://localhost:4000/refresh`

- Run development server with `npm run start`
