# Setting Up React App with Apollo Client and GraphQL Code Generator.

<details><summary><em>Fetching Data from GraphQL APIs with Apollo Client</em></summary>
<p>

I would divide the development into 4 steps in the front-end part of the project:

- Set Up Webpack development server;

  - initialize the project `npm init`
  - install webpack, webpack CLI as a devDependencies, `npm i -D webpack webpack-cli`. To start development server `npm i -D webpack-dev-server`.

- Intagrate Apollo client library with React;

  - install `npm i @apollo/client graphql`
  - create a new instance of ApolloClient class and connect the instance to React app with an ApolloProvider.
  - customize Apollo Client's data flow by processing a chain of link objects: TokenRefreshLink, ApolloLink, createHttpLink and pass the data to the cache.
    - HttpLink creates connect with remote server over HTTP;
    - ApolloLink add an authorization header to every HTTP request;
    - TokenRefreshLink provides update expired JWT access tokens;

- Generate hooks for fetching data;

  - Install GraphQL Code Generator `npm install -D @graphql-codegen/cli` to generate the hooks for fetching the data from a graphql API;
  - Configurate generator with `npx graphql-code-generator init` ;
  - Add the plugin `npm i -D @graphql-codegen/typescript-react-apollo ` that will generate custom Apollo React hooks for the query and mutations. Run it with the customized command.
    In the rezult we have generared folder with graphql.tsx file with ready to use hooks that generated out of the each .graphql file with described schema. The hooks easy to use fot fetching data in components.

- Create a React form components;

</p>
</details>

#### What Libraries do I use:

- Webpack;
- React;
- React Router DOM;
- Apollo Client (to manage remote data with GraphQL);
- jwt-decode (decoding JWTs token);
- Formik (to handle basic form programming and validation);
- Material UI (create a user interface)

To run project:
**npm run start**
