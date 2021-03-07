import React, { useState, createRef } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import makeToast from 'Toaster';

const RegisterForm = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = (e) => {
    e.preventDefault();

    const registerData = {
      name,
      email,
      password,
    };

    axios.post('/user/register', registerData).then((res) => {
      makeToast('success', res.data.message);
      props.history.push('/login');
    });
    // .catch((err) => {
    //   makeToast('error', err.res.data.errorMessage);
    // });
  };

  return (
    <Form
      onSubmit={registerUser}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your Name!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </Form.Item>

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
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={registerUser}
        >
          Sign up
        </Button>
        Or <a href="">login now!</a>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
