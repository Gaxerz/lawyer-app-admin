import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

const CreateClient = ({ currentUser, submitHandler }) => {
  const [form] = Form.useForm();

  const [initialValues, setInitialValues] = useState({
    username: currentUser.username,
    email: currentUser.email,
  })

  const onFinish = (values) => {
    console.log(values);
    if (values.password === undefined) {
      delete values.password;
    }
    submitHandler({ id: currentUser.id, ...values });
  };

  useEffect(() => {
    setInitialValues({
      username: currentUser.username,
      email: currentUser.email,
    })
    form.setFieldsValue({
      username: currentUser.username,
      email: currentUser.email,
    });
  },[currentUser,form])

  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      <Form.Item
        name="username"
        label="username"
        rules={[
          { required: true, message: 'Please enter your username' },
          // Add additional validation rules if needed
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="email"
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