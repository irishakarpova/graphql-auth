import { ApolloLink, Observable } from '@apollo/client';
import { getAccessToken } from '../AccessToken';

export const requestLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        authorization: `bearer ${accessToken}`,
      },
    });
  }
  return forward(operation);
});
