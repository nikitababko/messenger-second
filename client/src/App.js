import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Auth, Home, Dashboard, Chatroom } from './pages';

import './styles/index.scss';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={['/login', '/register']} component={Auth} />
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/chatroom/:id" component={Chatroom} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
