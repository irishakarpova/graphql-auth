import { createHttpLink } from '@apollo/client';

export const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_QUERY,
  credentials: 'include',
});
