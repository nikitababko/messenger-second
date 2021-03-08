import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
import makeToast from 'Toaster';

import { Auth, Home, Dashboard, Chatroom } from './pages';

import './styles/index.scss';

const App = () => {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem('token');
    if (token && !socket) {
      const newSocket = io('/', {
        query: {
          token: localStorage.getItem('token'),
        },
      });

      newSocket.on('disconnect', () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast('error', 'Socket disconnected!');
      });

      newSocket.on('connect', () => {
        makeToast('success', 'Socket connected!');
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route
            path={['/login', '/register']}
            render={() => (
              <Auth socket={socket} setupSocket={setupSocket} setupSocket={setupSocket} />
            )}
          />
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" render={() => <Dashboard socket={socket} />} />
          <Route path="/chatroom/:id" render={() => <Chatroom socket={socket} />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
