# Setting Up React App with Apollo Client and GraphQL Code Generator.

The front-end development process with Apollo Client and React can be divided into 4 steps:

1. Set Up Webpack development server environment for React;

- initialize the project `npm init`
- install webpack, webpack CLI, `npm i -D webpack webpack-cli`, `npm i -D webpack-dev-server`.
- Start development server.

2. Integrate Apollo client library with React;

- install Apollo Client with command `npm i @apollo/client graphql`
- create a new instance of ApolloClient class and connect the instance to React app with an ApolloProvider.
- customize Apollo Client's data flow by processing a chain of link objects: TokenRefreshLink, ApolloLink, createHttpLink.

  - HttpLink creates connect with a remote server over HTTP;
  - ApolloLink adds an authorization header to every HTTP request;
  - TokenRefreshLink provides updated expired JWT access tokens;

    Apollo Client's data will be stored in-memory cache.

3. Generate hooks for fetching data;

- Install a GraphQL Code Generator `npm install -D @graphql-codegen/cli` to generate the hooks for fetching the data from a graphql API;
- Configurate generator file with `npx graphql-code-generator init` ;
- Add the plugin `npm i -D @graphql-codegen/typescript-react-apollo` that will generate custom Apollo React hooks for the query and mutations. Add a GraphQL Code Generator script to the `package.json` file. Run it.
  In the result, we have generated a folder with graphql.tsx file with ready-to-use hooks that are generated out of each .graphql file with described schema. The hooks are easy to use for fetching data in components.

4. Create React form components;

- Import the hook that connects the back-end to front-end logic from generated `graphql.tsx` file and use to fetch GraphQL data as a React hook.
