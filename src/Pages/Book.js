import React, { useEffect, useState } from "react";
import MainLayout from "../Layout";
import { Button, Modal, Space, Table } from "antd";
import instance from "../axios";
import UpdateBook from "../components/UpdateBook";
import CreateBook from "../components/CreateBook";

const Book = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [currentBook, setCurrentBook] = useState({});

  const showModal = () => {
    setVisible(true);
  };

  const getData = async () => {
    try {
      const res = await instance.get("/book/get");
      if (res) {
        setUsers(res?.data?.books);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (text) => {
        const truncatedText = text?.slice(0, 50);
        return <span>{truncatedText}....</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
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

  const handleDelete = async (bookId) => {
    try {
      await instance.delete(`/book/delete/${bookId}`);
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    setUpdateModal(false);
    setVisible(false);
  };

  const handleUpdate = async (book) => {
    setCurrentBook({
      id: book._id,
      name: book.name,
      image: book.image,
      url: book.url,
    });
    setUpdateModal(true);
  };

  const submitUpdate = async (book) => {
    try {
      const temp = { ...book };
      delete temp.id;
      await instance.put(`/book/update/${book.id}`, temp);
      getData();
      setUpdateModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  const submitBook = async (book) => {
    try {
      console.log(book);
      const formData = new FormData();
      formData.append("name", book.name);
      formData.append("image", book.image[0].originFileObj);
      formData.append("pdf", book.pdf[0].originFileObj);
      console.log(book.pdf[0].originFileObj);
      await instance.post("/book/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setVisible(false);
      getData();
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <MainLayout title="Books Manager">
      <Modal open={visible} footer={false} closable onCancel={handleCancel}>
        <CreateBook submitHandler={submitBook} />
      </Modal>
      <Modal open={updateModal} footer={false} closable onCancel={handleCancel}>
        <UpdateBook currentBook={currentBook} submitHandler={submitUpdate} />
      </Modal>
      <Table
        dataSource={users}
        columns={columns}
        style={{ height: "80vh" }}
        pagination={{ pageSize: 6 }}
      />
    </MainLayout>
  );
};

export default Book;
