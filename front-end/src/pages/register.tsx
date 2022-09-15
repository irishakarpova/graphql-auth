import React from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { validationSchema } from './utility/verification';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const Register = () => {
  const [register, { error }] = useRegisterMutation();
  if (error) {
    return <p>Errors</p>;
  }
  let navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const response = await register({
          variables: {
            email: values.email,
            password: values.password,
          },
        });
        if (response.data?.register) {
          navigate('/');
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Container maxWidth="sm">
            <Box pt="20px" pb="20px">
              <Typography variant="h5">Sign Up</Typography>
            </Box>
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
                  Submit
                </Button>
                <Link sx={{ pl: '20px' }} href="/">
                  Have an account? Sign in
                </Link>
              </Box>
            </Box>
          </Container>
        </Form>
      )}
    </Formik>
  );
};
