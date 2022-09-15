export const setAccessToken = (token: string) => {
  localStorage.setItem('jid', token);
};

export const getAccessToken = () => {
  return localStorage.getItem('jid');
};
