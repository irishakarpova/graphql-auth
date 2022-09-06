import React from 'react';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../AccessToken';
import { Formik, Form, Field } from 'formik';
import Button from '@mui/material/Button';
import { TextField } from 'formik-mui';
import Box from '@mui/material/Box';

export const Login = () => {
  const [data, { error }] = useLoginMutation();

  if (error) {
    return <p>Errors</p>;
  }

  let navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        const response = await data({
          variables: {
            email: values.email,
            password: values.password,
          },

          update: (store, { data }) => {
            if (data) {
              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data.login.user,
                },
              });
            }
          },
        });

        if (response && response.data) {
          setAccessToken(response.data.login.accessToken.toString());
        }
        navigate('/');
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box
            sx={{
              '& .MuiTextField-root': {
                display: 'flex',
                mb: '10px',
                width: '50ch',
              },
            }}
          >
            <Field component={TextField} type="email" name="email" />
            <Field component={TextField} type="password" name="password" />

            <Button
              disabled={isSubmitting}
              color="primary"
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
