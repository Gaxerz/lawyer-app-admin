import React, { useEffect, useState } from 'react'
import MainLayout from '../Layout'
import { Button, Modal, Space, Table } from 'antd';
import instance from '../axios';
import CreateClient from '../components/CreateClient';
import UpdateClient from '../components/UpdateClient';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async (value) => {
    try {
      const res = await instance.post('/user/register', value);
      if (res?.data?.status === 200) {
        getData();
      }
      setVisible(false);
    } catch (e) {
      console.log(e)
    }
  };

  const getData = async () => {
    try {
      const res = await instance.get('/user/users');
      if (res) {
        setUsers(res?.data)
      }
    } catch (e) {
      console.log(e)
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

          <Button type="primary" onClick={() => handleUpdate(record)}>
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
    try {
      await instance.delete(`/user/delete/${clientId}`);
      getData();
    } catch (e) {
      console.log(e)
    }
  };

  const handleUpdate = async (client) => {
    setCurrentUser({ id: client._id, username: client.username, email: client.email });
    setUpdateModal(true);
  };

  const handleCancel = () => {
    setUpdateModal(false);
    setVisible(false);
  };

  const submitUpdate = async (client) => {
    try {
      const temp = { ...client };
      delete temp.id;
      await instance.put(`/user/update/${client.id}`, temp);
      getData();
      setUpdateModal(false);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <MainLayout title='Clients Manager'>
      <Modal
        open={visible}
        footer={false}
        closable
        onCancel={handleCancel}
      >

        <CreateClient submitHandler={handleOk} />
      </Modal>
      <Modal
        open={updateModal}
        footer={false}
        closable
        onCancel={handleCancel}
      >
        <UpdateClient currentUser={currentUser} submitHandler={submitUpdate} />
      </Modal>
      <Button style={{ float: 'right', marginBottom: '20px' }} onClick={showModal}>Create Clients</Button>
      <Table dataSource={users} columns={columns} />
    </MainLayout>

  )
}

export default Home