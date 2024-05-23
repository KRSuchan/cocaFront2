import React, { useState } from 'react';
import { LogoutOutlined, BellOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const MainLogo = () => {
    const [showNotification, setShowNotification] = useState(true);
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/");
    }
    
    const handleNotificationClick = () => {
        navigate('/notice');
    };

    return (
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
            {showNotification && (
                <div style={{ marginLeft: '20px',marginRight: '10px', cursor: 'pointer' }} onClick={handleNotificationClick}>
                    <BellOutlined style={{ color: 'gray', fontSize: '24px' }} />
                </div>
            )}
            <div style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={handleLogOut}>
                <LogoutOutlined style={{ color: 'gray', fontSize: '24px' }} />
            </div>
            <div style={{ flexGrow: 1 }}></div>
            <div className="logo-text">COCA</div>
        </div>
    );
}

export default MainLogo;