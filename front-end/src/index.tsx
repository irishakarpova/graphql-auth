import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  ApolloLink,
  HttpLink,
  Observable,
} from '@apollo/client';
import { AppRoutes } from './AppRoutes';
import { refreshLink } from './utils/refreshLink';
import { httpLink } from './utils/httpLink';
import { requestLink } from './utils/authLink';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/main.css';

const client = new ApolloClient({
  link: ApolloLink.from([refreshLink, requestLink, httpLink]),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <CssBaseline />
      <AppRoutes />
    </React.StrictMode>
  </ApolloProvider>
);
