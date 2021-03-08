import React, { useState } from 'react';
import axios from 'axios';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import makeToast from 'Toaster';
import { withRouter } from 'react-router';

const LoginForm = ({ history, setupSocket }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    axios.post('/user/login', loginData).then((res) => {
      makeToast('success', res.data.message);
      localStorage.setItem('token', res.data.token);
      history.push('/dashboard');
      setupSocket();
    });
  };

  return (
    <Form
      onSubmit={loginUser}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Form.Item>

      <Form.Item>
        <Button
          onClick={loginUser}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default withRouter(LoginForm);
