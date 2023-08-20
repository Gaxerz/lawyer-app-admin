import React from 'react';
import { Form, Input, Button, Upload } from 'antd';

const CreateBook = ({ submitHandler }) => {
  const onFinish = (values) => {
    // Call the submitHandler with the form values
    submitHandler(values);
  };

  // Custom function to handle the image and pdf file before uploading
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      // Validate that the uploaded file is an image (you can add additional checks here)
      console.error('You can only upload image files!');
    }
    return isImage;
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Book Name"
        rules={[
          { required: true, message: 'Please enter the book name' },
          // Add additional validation rules if needed
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="image"
        label="Book Cover Image"
        valuePropName="fileList"
        getValueFromEvent={(e) => e && e.fileList}
        rules={[
          { required: true, message: 'Please upload the book cover image' },
          // Add additional validation rules if needed
        ]}
      >
        <Upload beforeUpload={beforeUpload}>
          <Button>Select Image</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name="pdf"
        label="Book PDF File"
        valuePropName="fileList"
        getValueFromEvent={(e) => e && e.fileList}
        rules={[
          { required: true, message: 'Please upload the book PDF file' },
          // Add additional validation rules if needed
        ]}
      >
        <Upload beforeUpload={beforeUpload}>
          <Button>Select PDF</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateBook;
