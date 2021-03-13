import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../auth';

function PrivateRoute({ component, ...rest }) {
  let auth = useAuth();

  let routeComponent = component;
  let redirect;

  if (!auth.user) {
    routeComponent = undefined;
    redirect = ({ location }) => (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    );
  }

  return (
    <Route
      component={routeComponent}
      render={redirect}
      {...rest}
    />
  );
}

export default PrivateRoute;
