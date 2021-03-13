import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './layout/Header';
import PageAdmin from './pages/Admin';
import PageHome from './pages/Home';
import PageLoading from './pages/Loading';
import PageLogIn from './pages/LogIn';
import PageLogOut from './pages/LogOut';
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../auth';
import { useState } from 'react';

function Navigator() {
  const auth = useAuth();

  // Wait 1 sec before redirecting, less jarring
  const [ready, setReady] = useState(false);
  setTimeout(() => {
    setReady(true);
  }, 1000);

  return (
    <Router>
      <Header/>
      {!auth.loaded || !ready
        ? (
          <PageLoading/>
        )
        : (
          <Switch>
            <Route
              component={PageLogIn}
              path="/login"
            />
            <Route
              component={PageLogOut}
              path="/logout"
            />
            <PrivateRoute
              component={PageHome}
              exact
              path="/"
            />
            <PrivateRoute
              component={PageAdmin}
              path="/admin"
            />
          </Switch>
        )}
    </Router>
  );
}

export default Navigator;
