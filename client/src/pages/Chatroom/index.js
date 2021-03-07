import React from 'react';
import io from 'socket.io-client';

const Chatroom = ({ match }) => {
  const chatroomId = match.params.id;

  const socket = io('/', {
    query: {
      token: localStorage.getItem('token'),
    },
  });

  return <div>Chatroom</div>;
};

export default Chatroom;
