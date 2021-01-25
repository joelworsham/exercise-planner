import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Header from './components/layout/Header';
import PageHome from './components/pages/Home';
import PageAdmin from './components/pages/Admin';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route
          exact
          path="/"
        >
          <PageHome/>
        </Route>
        <Route path="/admin">
          <PageAdmin/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
