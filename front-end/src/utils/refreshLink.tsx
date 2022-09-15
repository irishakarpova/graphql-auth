import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { setAccessToken } from '../AccessToken';
import { isTokenExpired } from './isTokenExpired';

export const refreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => isTokenExpired(),
  fetchAccessToken: () => {
    return fetch(process.env.REFRESH_TOKEN!, {
      method: 'POST',
      credentials: 'include',
    });
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleError: (err) => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
  },
});
