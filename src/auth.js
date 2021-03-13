import React, { useState, useContext, createContext } from 'react';
import currentUserQuery from './graphql/queries/auth/currentUser';
import logInQuery from './graphql/mutations/auth/logIn';
import logOutQuery from './graphql/mutations/auth/logOut';
import makeRequest from './util/graphql/makeRequest';

const authContext = createContext();

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);

  const getCurrentUser = async () => {
    const { data, errors } = await makeRequest({
      query: currentUserQuery,
    });

    if (errors) {
      setErrors(errors);
    } else {
      setUser(data.currentUser || false);
    }

    setLoaded(true);
  };

  const logIn = async (email, password) => {
    setErrors(null);

    const response = await makeRequest({
      query: logInQuery,
      variables: {
        email,
        password,
      },
    });

    if (response.errors) {
      setErrors(response.errors);
    } else {
      setUser(response.data.logIn.user);
    }
  };

  const logOut = async () => {
    setErrors(null);

    const response = await makeRequest({
      query: logOutQuery,
    });

    if (response.errors) {
      setErrors(response.errors);
    } else {
      setUser(null);
    }
  };

  // Return the user object and auth methods
  return {
    user,
    errors,
    loaded,
    getCurrentUser,
    logIn,
    logOut,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  // Initially try and get current user
  if (!auth.user && !auth.loaded) {
    auth.getCurrentUser();
  }

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
