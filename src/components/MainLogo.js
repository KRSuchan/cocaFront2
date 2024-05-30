// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { LogoutOutlined, BellOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../security/TokenManage';

const MainLogo = () => {
    const [showNotification, setShowNotification] = useState(true);
    const [notices, setNotices] = useState([]);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout(navigate);
        // localStorage.clear();
        // navigate("/");
    }
    
    const handleNotificationClick = () => {
        navigate('/notice');
    };

    useEffect(() => {
        const fetchNotices = async () => {
            try { //✌️ 공지사항 받아오기 구현, 내 캘린더일때는 아래 콘텐츠 띄우게 설정해두었음당
                const response = await axios.get(''); // 백엔드에서 공지사항을 받아오는 API 엔드포인트
                setNotices(response.data);
            } catch (error) {
                console.error('Failed to fetch notices:', error);
                // 백엔드가 연결되지 않았을 때의 가정된 데이터
                const fallbackResponse = {
                    code: 200,
                    message: "OK",
                    data: {
                        contents: "우리 캘린더는 사용자의 편의를 최우선으로 생각하여 설계된 혁신적인 도구입니다. 다양한 기능과 직관적인 인터페이스를 통해 일정을 쉽게 관리할 수 있으며, 팀원들과의 원활한 협업을 지원합니다. 지금 바로 사용해보세요!"
                    }
                };
                setNotices([fallbackResponse.data.contents]);
            }
        };

        fetchNotices();
    }, []);

    useEffect(() => {
        const marquee = document.querySelector('.marquee');
        let scrollAmount = 0;
        const scrollStep = 1; // 스크롤 속도 조절

        const scrollMarquee = () => {
            scrollAmount -= scrollStep;
            if (scrollAmount <= -marquee.scrollWidth) {
                scrollAmount = marquee.offsetWidth;
            }
            marquee.style.transform = `translateX(${scrollAmount}px)`;
        };

        const interval = setInterval(scrollMarquee, 30); // 스크롤 주기 조절

        return () => clearInterval(interval);
    }, [notices]);

    return (
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
            {showNotification && (
                <div style={{ marginLeft: '20px', marginRight: '10px', cursor: 'pointer' }} onClick={handleNotificationClick}>
                    <BellOutlined style={{ color: 'gray', fontSize: '24px' }} />
                </div>
            )}
            <div style={{ marginLeft: '10px', cursor: 'pointer', marginRight: '20px' }} onClick={handleLogOut}>
                <LogoutOutlined style={{ color: 'gray', fontSize: '24px' }} />
            </div>
            <div className="marquee-container" style={{ flexGrow: 1, overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <div className="marquee" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {notices.map((notice, index) => (
                        <span key={index} style={{ marginRight: '50px', fontFamily: 'Noto Sans KR' }}>
                            {notice}
                        </span>
                    ))}
                </div>
            </div>
            <div className="logo-text" style={{ marginLeft: '10px' }}>COCA</div>
        </div>
    );
}

export default MainLogo;
