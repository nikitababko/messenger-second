import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Auth, Home } from './pages';

import './styles/index.scss';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={['/login', '/register']} component={Auth} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
