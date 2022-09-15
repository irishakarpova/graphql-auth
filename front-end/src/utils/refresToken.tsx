export const refreshToken = () => {
  return fetch(process.env.REFRESH_TOKEN!, {
    method: 'POST',
    credentials: 'include',
  });
};
