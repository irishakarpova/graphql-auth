import React from 'react';
import { useUsersQuery } from '../generated/graphql';
import { Header } from './header';

export const Home = () => {
  const { data, error, loading } = useUsersQuery({
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
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
    <div>
      <Header />
      {loading && <p>loading...</p>}
      <p>{errorMessage}</p>
      <ul>
        {data ? (
          data.users.map((user) => {
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
    </div>
  );
};
