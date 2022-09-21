import React from 'react';
import {
  LoggedInUserDocument,
  LoggedInUserQuery,
  useLoginMutation,
} from '../generated/graphql';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../AccessToken';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import Button from '@mui/material/Button';
import { TextField } from 'formik-mui';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { FormValues } from './utility/interfaces';

export const Login = () => {
  const [login] = useLoginMutation();

  let navigate = useNavigate();
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const response = await login({
      variables: {
        email: values.email,
        password: values.password,
      },

      update: (store, { data }) => {
        if (data) {
          store.writeQuery<LoggedInUserQuery>({
            query: LoggedInUserDocument,
            data: {
              loggedInUser: data.login.user,
            },
          });
        }
      },
    });

    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
    }
    navigate('/home');
    setSubmitting(false);
  };

  return (
    <Container maxWidth="sm">
      <Box pt="20px" pb="20px">
        <Typography variant="h5">Sign In</Typography>
      </Box>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              sx={{
                '& .MuiTextField-root': {
                  display: 'flex',
                  mb: '10px',
                },
              }}
            >
              <Field
                component={TextField}
                type="email"
                name="email"
                label="Email Address"
              />
              <Field
                component={TextField}
                type="password"
                name="password"
                label="Password"
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: '20px',
                }}
              >
                <Button
                  disabled={isSubmitting}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Sign In
                </Button>
                <Link sx={{ pl: '20px' }} href="/register">
                  Don't have an account? Sign Up
                </Link>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
