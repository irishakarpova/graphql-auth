import React from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const Register = () => {
  const [register, { error }] = useRegisterMutation();
  if (error) {
    return <p>Errors</p>;
  }
  let navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        const response = await register({
          variables: {
            email: values.email,
            password: values.password,
          },
        });
        if (response) {
          navigate('/');
        }

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
