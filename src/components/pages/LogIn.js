import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';

import Page from '../layout/Page';
import { useAuth } from '../../auth';
import { Redirect } from 'react-router-dom';

function PageLogin(
  {
    location,
  },
) {
  const auth = useAuth();

  const [loginState, updateLoginState] = useState({
    email: process.env.REACT_APP_DEV_USERNAME || '',
    password: process.env.REACT_APP_DEV_PASSWORD || '',
  });
  const [loggingIn, updateLoggingIn] = useState(false);
  const [validated, updateValidated] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() !== false) {
      updateValidated(false);

      updateLoggingIn(true);
      await auth.logIn(loginState.email, loginState.password);
      updateLoggingIn(false);
    } else {
      updateValidated(true);
    }
  };

  const handleUpdateActivityState = (state) => {
    updateLoginState({
      ...loginState,
      ...state,
    });
  };

  return (
    <Page title="Log In">
      {auth.user && (
        <Redirect
          to={{
            pathname: location.state?.from?.pathname || '/',
          }}
        />
      )}
      {loggingIn && 'LOGGING IN'}
      {!!auth.errors && JSON.stringify(auth.errors)}
      <Form
        className="ep-login"
        noValidate
        validated={validated}
        onSubmit={handleLogin}
      >
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="email@example.com"
            value={loginState.email}
            onChange={(event) => handleUpdateActivityState({
              email: event.target.value,
            })}
          />
          <Form.Control.Feedback type="invalid">
            Enter your email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={loginState.password}
            onChange={(event) => handleUpdateActivityState({
              password: event.target.value,
            })}
          />
          <Form.Control.Feedback type="invalid">
            Enter your password
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">
          Log In
        </Button>
      </Form>
    </Page>
  );
}

export default PageLogin;
