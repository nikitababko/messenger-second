import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Card, Input, Button } from 'antd';

import './index.scss';

const Chatroom = ({ match, socket }) => {
  const chatroomId = match.params.id;
  const [messages, setMessages] = useState([]);
  const [messageSent, setMessageSent] = useState('');
  const [userId, setUserId] = useState('');

  console.log(messages);

  const sendMessage = () => {
    if (socket) {
      socket.emit('CHATROOM_MESSAGE', {
        chatroomId,
        message: messageSent,
      });

      setMessageSent('');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.id);
    }

    if (socket) {
      console.log(messages);
      socket.on('NEW_MESSAGE', (message) => {
        console.log(message);
        const newMessages = [...messages, message];
        // console.log(message.name);
        setMessages(newMessages);
      });
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.emit('JOIN_ROOM', {
        chatroomId,
      });
    }

    return () => {
      if (socket) {
        socket.emit('LEAVE_ROOM', {
          chatroomId,
        });
      }
    };
  }, []);

  const { TextArea } = Input;

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        className="chatroom-card"
        title="Card title"
        bordered={false}
        style={{ width: 600, height: 600 }}
      >
        {messages.map((message, i) => {
          <div key={i} className="partner">
            <span className={userId === message.userId ? 'own' : 'partner'}>
              {message.name}
            </span>
            {message.message}
          </div>;
        })}

        {messages.map((item) => console.log(item))}

        <TextArea
          className="chatroom-textarea"
          onChange={(e) => setMessageSent(e.target.value)}
          value={messageSent}
        />
        <Button className="chatroom-btn" onClick={sendMessage} type="primary">
          Send
        </Button>
      </Card>
    </div>
  );
};

export default withRouter(Chatroom);
