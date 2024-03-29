import React, { useEffect, useRef } from 'react';

const ChatComponent = ({ chat }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever the chat updates
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chat]);

  return (
    <div
      ref={chatContainerRef}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', height: '450px', overflow: 'auto' }}
    >
      {chat?.map((data, index) => {
        const isUser = data?.role === 'user';
        const messageStyle = isUser
          ? { alignSelf: 'flex-end', backgroundColor: '#dcf8c6' }
          : { alignSelf: 'flex-start', backgroundColor: '#c2c2c2' };
        const timeAlignment = isUser ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' };

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '80%',
              padding: '10px',
              borderRadius: isUser ? '20px 0px 20px 20px' : '0px 20px 20px 20px',
              ...messageStyle,
            }}
          >
            <div style={{ color: '#000' }}>{data?.message}</div>
            <div style={{ fontSize: '12px', ...timeAlignment }}>{data?.createdAt?.slice(11, 16)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatComponent;
