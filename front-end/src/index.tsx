import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
} from '@apollo/client';
import { AppRoutes } from './AppRoutes';
import { refreshLink } from './utils/refreshLink';
import { httpLink } from './utils/httpLink';
import { authLink } from './utils/authLink';
import CssBaseline from '@mui/material/CssBaseline';

const client = new ApolloClient({
  link: from([authLink, refreshLink, httpLink]),
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
