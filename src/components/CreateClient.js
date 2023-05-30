import React from 'react';
import { Form, Input, Button } from 'antd';

const CreateClient = ({submitHandler}) => {
    const onFinish = (values) => {
        submitHandler(values);
      };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="username"
        label="Username"
        rules={[
          { required: true, message: 'Please enter your username' },
          // Add additional validation rules if needed
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
          // Add additional validation rules if needed
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Please enter your password' },
          // Add additional validation rules if needed
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateClient