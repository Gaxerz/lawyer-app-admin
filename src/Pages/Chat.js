import React, { useEffect, useState } from 'react'
import MainLayout from '../Layout'
import { Button, Input } from 'antd';
import instance from '../axios';
import ChatComponent from '../components/ChatComponent';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [current, setCurrent] = useState(0);
  const [message, setMessage] = useState();

  const getData = async () => {
    const res = await instance.get('/chat/chat');
    if (res) {
      setChats(res?.data)
    }
  }

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 5000);
    // Clean up the interval when component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [])

  const sendHandler = async () => {
    const docData = {
      room: chats[current]?.room,
      role: 'admin',
      message,
    };
    const res = await instance.post('/chat/set', docData);
    if (res?.data?.status === 200) {
      getData()
    }
  }
  return (
    <MainLayout title='Chat Manager'>
      <div style={{ background: "grey", height: '80vh', display: 'flex', borderRadius: "20px", boxShadow: '0 0 10px #fff' }}>
        <div style={{ background: '#2E5A88', flex: 1, borderBottomLeftRadius: "20px", borderTopLeftRadius: '20px' }}>
          <div style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '700', height: '54px', color: 'black', background: '#c2c2c2', borderTopLeftRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>CHATS</div>
          {
            chats.length > 0 && chats?.map((data, idx) => (
              <div onClick={() => { setCurrent(idx) }} key={idx} style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '700', height: '50px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid black', borderRadius: '3px', padding: '0 10px' }}>
                <span>{data?.username}</span>
                <span style={{ fontSize: '14px' }}>{data?.chats[data?.chats.length - 1].createdAt?.slice(11, 16)}</span>
              </div>
            ))
          }
        </div>
        <div style={{ flex: 4, display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, marginBottom: '20px', fontSize: '20px', fontWeight: '700', height: '50px', color: 'white', background: '#2E5A88', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{chats[current]?.username}</div>
          <div style={{ flex: 8 }}><ChatComponent chat={chats[current]?.chats} /></div>
          <div style={{ flex: 1, padding: '10px', background: '#c2c2c2', display: 'flex', gap: '20px', alignItems: 'center', borderBottomRightRadius: '20px' }}><Input placeholder='Write a Message' value={message} onChange={(e) => setMessage(e.target.value)} /><Button onClick={sendHandler}>SEND</Button></div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Chat