import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

const UpdateBook = ({ currentBook, submitHandler }) => {
  const [form] = Form.useForm();

  const [initialValues, setInitialValues] = useState({
    name: currentBook.name,
    image: currentBook.image,
    url: currentBook.url,
  })

  const onFinish = (values) => {
    submitHandler({ id: currentBook.id, ...values });
  };

  useEffect(() => {
    setInitialValues({
      name: currentBook.name,
      image: currentBook.image,
      url: currentBook.url,
    })
    form.setFieldsValue({
      name: currentBook.name,
      image: currentBook.image,
      url: currentBook.url,
    });
  },[currentBook,form])

  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      <Form.Item
        name="name"
        label="name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="image"
        label="image"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="url"
        label="url"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UpdateBook