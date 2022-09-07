import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { setAccessToken } from '../AccessToken';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>you are logged in as: {data.me.email}</div>;
  } else {
    body = (
      <Container maxWidth="sm">
        <Box pt="20px">
          <Typography variant="h5">log in please</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <header>
      {body}
      <div>
        {!loading && data && data.me ? (
          <button
            onClick={async () => {
              await logout();
              localStorage.clear();
              await client!.resetStore();
            }}
          >
            logout
          </button>
        ) : null}
      </div>
    </header>
  );
};
