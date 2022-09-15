import Typography from '@mui/material/Typography';
import React from 'react';
import { setAccessToken } from '../AccessToken';
import Button from '@mui/material/Button';
import { useLogoutMutation, useLoggedInUserQuery } from '../generated/graphql';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import LinearProgress from '@mui/material/LinearProgress';

export const Header: React.FC = () => {
  const { data, loading } = useLoggedInUserQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [logout, { client }] = useLogoutMutation();

  const handleLogOut = async () => {
    await logout();
    localStorage.clear();
    setAccessToken('');
    await client!.resetStore();
  };

  return (
    <header>
      <AppBar position="static">
        {loading && <LinearProgress />}
        <Stack
          direction="row"
          alignItems="center"
          sx={{ mx: 4 }}
          spacing={2}
          py={2}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>

          {data && data.loggedInUser ? (
            <Typography variant="body1">{data.loggedInUser.email}</Typography>
          ) : null}

          {data && data.loggedInUser ? (
            <Button color="inherit" variant="outlined" onClick={handleLogOut}>
              logout
            </Button>
          ) : (
            <Button color="inherit" variant="outlined">
              <Link className={styles.btnLink} to="/">
                login
              </Link>
            </Button>
          )}
        </Stack>
      </AppBar>
    </header>
  );
};
