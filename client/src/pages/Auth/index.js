import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LoginForm, RegisterForm } from 'modules';
import { Dashboard } from 'pages';

const Auth = ({ setSocket, setupSocket }) => (
  <section className="auth">
    <div className="auth__content">
      <Router>
        <Switch>
          <Route
            path="/login"
            render={() => <LoginForm setSocket={setSocket} setupSocket={setupSocket} />}
          />
          <Route path="/register" component={RegisterForm} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  </section>
);

export default Auth;
