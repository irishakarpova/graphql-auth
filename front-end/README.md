# Setting Up React App with Apollo Client and GraphQL Code Generator.

The front-end development process with Apollo Client and React can be divided into 4 steps:

- Set Up Webpack development server;

  - initialize the project `npm init`
  - install webpack, webpack CLI as a devDependencies, `npm i -D webpack webpack-cli`. To start development server `npm i -D webpack-dev-server`.

- Integrate Apollo client library with React;

  - install `npm i @apollo/client graphql`
  - create a new instance of ApolloClient class and connect the instance to React app with an ApolloProvider.
  - customize Apollo Client's data flow by processing a chain of link objects: TokenRefreshLink, ApolloLink, createHttpLink and pass the data to the cache.
    - HttpLink creates connect with a remote server over HTTP;
    - ApolloLink adds an authorization header to every HTTP request;
    - TokenRefreshLink provides updated expired JWT access tokens;

- Generate hooks for fetching data;

  - Install GraphQL Code Generator `npm install -D @graphql-codegen/cli` to generate the hooks for fetching the data from a graphql API;
  - Configurate generator with `npx graphql-code-generator init` ;
  - Add the plugin `npm i -D @graphql-codegen/typescript-react-apollo ` that will generate custom Apollo React hooks for the query and mutations. Run it with the customized command.
    In the result, we have generated a folder with graphql.tsx file with ready-to-use hooks that are generated out of each .graphql file with described schema. The hooks are easy to use for fetching data in components.

- Create React form components;
