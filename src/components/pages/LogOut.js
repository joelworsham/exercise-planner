import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Page from '../layout/Page';
import { useAuth } from '../../auth';

function PageLogin() {
  const auth = useAuth();
  auth.logOut();

  // Wait 1 sec before redirecting, less jarring
  const [ready, setReady] = useState(false);
  setTimeout(() => {
    setReady(true);
  }, 1000);

  return (
    <Page title="Logging Out...">
      {!auth.user && ready && (
        <Redirect
          to='/login'
        />
      )}
    </Page>
  );
}

export default PageLogin;
