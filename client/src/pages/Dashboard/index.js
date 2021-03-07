import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const RegisterForm = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [chatRoomName, setChatRoomName] = useState('');

  const getChatrooms = () => {
    axios
      .get('/chatroom', {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setChatrooms(res.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  useEffect(() => {
    getChatrooms();
  }, []);

  const createChatroom = (e) => {
    e.preventDefault();

    axios.post('/chatroom', chatRoomName);
  };

  return (
    <Form
      onSubmit={createChatroom}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="chatroom"
        rules={[
          {
            required: true,
            message: 'Please input Chatroom!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Chatroom"
          onChange={(e) => setChatRoomName(e.target.value)}
          value={chatRoomName}
        />
      </Form.Item>

      <Form.Item>
        <Button
          onClick={createChatroom}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Create chatroom
        </Button>
      </Form.Item>

      {chatrooms.map((chatroom) => (
        <div key={chatroom._id}>
          <Form.Item label={chatroom.name}>
            <Row gutter={8}>
              <Col span={12}>
                <Link to={`/chatroom/${chatroom._id}`}>
                  <Button>Join</Button>
                </Link>
              </Col>
            </Row>
          </Form.Item>
        </div>
      ))}
    </Form>
  );
};

export default RegisterForm;
