import React from 'react';
import { useUsersQuery } from '../generated/graphql';
import { Header } from './header';

export const Home = () => {
  const { data, error, loading } = useUsersQuery({
    fetchPolicy: 'network-only',
  });

  let errorMessage: string | undefined;

  if (error) {
    if (
      error.networkError &&
      typeof window !== 'undefined' &&
      !window.navigator.onLine
    ) {
      errorMessage = 'Sorry, your browser is offline';
    } else {
      errorMessage = 'An error occurred';
    }
  }
  return (
    <>
      <Header />
      <ul>
        {!loading && data ? (
          data.users.map((user: any) => {
            return (
              <li key={user.id}>
                {user.email} - {user.id}
              </li>
            );
          })
        ) : (
          <p>No data</p>
        )}
      </ul>
    </>
  );
};
