import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children,title }) => {
    return (
        <div style={{ height: '100vh', display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <Sidebar />
            </div>
            <div style={{ flex: 4 }}>
            <div 
            style={{ 
            height:'50px',backgroundColor:'purple',fontSize:'30px',
            color:'white',fontWeight:'700',display:'flex',alignItems:'center',justifyContent:'center'
            }}
            >
            <div>{title}</div>
            </div>
                <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
            </div>
        </div>
    );
};

export default MainLayout;
