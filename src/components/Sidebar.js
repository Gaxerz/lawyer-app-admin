import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  BookOutlined,
  CommentOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{ height: "100vh", paddingTop: "50px" }}
    >
      <Menu.Item
        key="1"
        icon={<DashboardOutlined style={{ fontSize: "30px" }} />}
        style={{ fontSize: "30px", marginTop: "50px" }}
      >
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<BookOutlined style={{ fontSize: "30px" }} />}
        style={{ fontSize: "30px", marginTop: "50px" }}
      >
        <Link to="/book">Books</Link>
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<CommentOutlined style={{ fontSize: "30px" }} />}
        style={{ fontSize: "30px", marginTop: "50px" }}
      >
        <Link to="/chat">Chat</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
