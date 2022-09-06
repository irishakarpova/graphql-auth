import jwtDecode, { JwtPayload } from 'jwt-decode';
import { getAccessToken } from '../AccessToken';

export const isTokenExpired = () => {
  const token = getAccessToken();
  if (!token) {
    return true;
  }

  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp || Date.now() >= exp * 1000) {
      return false;
    } else {
      return true;
    }
  } catch {
    return false;
  }
};
