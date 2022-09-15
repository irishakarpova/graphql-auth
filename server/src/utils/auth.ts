import { User } from '../entity/User';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '1m',
  });
};
export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '10m',
  });
};
