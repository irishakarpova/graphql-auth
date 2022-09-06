export const refreshToken = () => {
  console.log('refresh');
  return fetch(process.env.REFRESH_TOKEN!, {
    method: 'POST',
    credentials: 'include',
  });
};
