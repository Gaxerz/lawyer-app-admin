import React, { useEffect, useState } from 'react'
import MainLayout from '../Layout'
import { Button, Modal, Space, Table } from 'antd';
import instance from '../axios';
import CreateClient from '../components/CreateClient';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async (value) => {
    // Handle any logic when the modal's OK button is clicked
    console.log(value)
    const res = await instance.post('/user/register', value);
    if (res?.data?.status === 200) {
      getData();
    }
    setVisible(false);
  };

  const getData = async () => {
    const res = await instance.get('/user/users');
    if (res) {
      setUsers(res?.data)
    }
  }

  useEffect(() => {
    getData();
  }, [])


  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => handleUpdate(record._id)}>
            Update
          </Button>
          <Button type="danger" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (clientId) => {
    // Handle delete logic here
    await instance.delete(`/user/delete/${clientId}`);
    getData();
  };

  const handleUpdate = async (clientId) => {
    // Handle update logic here
    // await instance.post(`/user/delete/${clientId}`);
    console.log(`Updating client with ID: ${clientId}`);
  };

  return (
    
      <MainLayout title='Clients Manager'>
        <Modal
          open={visible}
          footer={false}
        >
          <CreateClient submitHandler={handleOk} />
        </Modal>
        <Button style={{ float: 'right', marginBottom: '20px' }} onClick={showModal}>Create Clients</Button>
        <Table dataSource={users} columns={columns} />
      </MainLayout>
    
  )
}

export default Home