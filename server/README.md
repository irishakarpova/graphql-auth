# Building GraphQL APIs with TypeGraphQL and TypeORM

The concept of building GraphQL APIs with TypeGraphQL and TypeORM.

The main goal of using the tools is to unify and simplify the work with the database and GraphQL schema with further processing to resolvers in one place. TypeORM library gets data from a database and maps tables to model classes, TypeGraphQL generates a GraphQL schema into classes with Typescript and allows us to process resolvers in one place.

Here, we are setting up:

- TypeORM library using CLI
  - install global version `npm i -g typeorm`
  - initialize a new TypeORM project `init --name <folder_name> --database postgres`
- The GraphQL server
  - install `npm i -g express apollo-server-express graphql` and `npm i -D --save @types/express`
    Here, we use the express framework as a web server and the apollo-server-express package as a middleware to connect GraphQl.
- Create database table structure through TypeORM model.
  The model represents a database table whose rows are mapped to Entity class.
- Describe the resolver class by TypeGraphQL and define queries and mutations.

The process of creation JWT Token?

1. When the user makes API call and sents login data, then the Authentication Server creates the JWT using function `{sign} from 'jsonwebtoken'`. ;
2. The Server validate data and, if the user is found and data is successfully validated, sends an Access Token to the user;
3. Cookie in the Context returns an Access token data to create a Refresh Token.
