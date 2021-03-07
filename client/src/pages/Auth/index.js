import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LoginForm, RegisterForm } from 'modules';

const Auth = () => (
  <section className="auth">
    <div className="auth__content">
      <Router>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
        </Switch>
      </Router>
    </div>
  </section>
);

export default Auth;
