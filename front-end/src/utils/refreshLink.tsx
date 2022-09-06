import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { setAccessToken } from '../AccessToken';
import { isTokenExpired } from './isTokenExpired';
import { refreshToken } from './refresToken';

export const refreshLink = new TokenRefreshLink({
  isTokenValidOrUndefined: () => isTokenExpired(),

  fetchAccessToken: () => {
    return refreshToken();
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleError: () => {
    throw new Error('Your refresh token is invalid. Try to relogin');
  },
});
