// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { LogoutOutlined, BellOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout, refreshAccessToken } from '../security/TokenManage';
import { useSelector } from 'react-redux';

const MainLogo = () => {
    const [showNotification, setShowNotification] = useState(true);
    const [notices, setNotices] = useState([]);
    const navigate = useNavigate();
    const selectedGroup = useSelector(state => state.selectedGroup);
    

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
                if(selectedGroup.groupId === -1){
                    throw new Error('is Personal Schedule');
                }

                const accessToken = localStorage.getItem('accessToken');

                const config = {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                };

                console.log('notice fetcha');

                const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/api/group/notice?memberId=${localStorage.getItem('userId')}&groupId=${selectedGroup.groupId}`, config); // 백엔드에서 공지사항을 받아오는 API 엔드포인트

                console.log(response);

                if(response.data.data.contents === null) {
                    response.data.data.contents = "현재 공지가 없습니다.";
                }
                if(response.data.code === 200) {
                    setNotices([response.data.data.contents]);

                    console.log(notices);
                } else if(response.data.code === 401) {
                    await refreshAccessToken(navigate);
                    fetchNotices();
                } else {
                    throw new Error('unknown Error');
                }
            } catch (error) {
                console.error('Failed to fetch notices:', error);
                // 백엔드가 연결되지 않았을 때의 가정된 데���터
                const fallbackResponse = {
                    code: 200,
                    message: "OK",
                    data: {
                        contents: "우리 캘린더는"
                    }
                };
                setNotices([fallbackResponse.data.contents]);
            }
        };

        fetchNotices();
    }, [selectedGroup]);

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
            <div className="marquee-container" style={{ flexGrow: 1, overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', justifyContent: 'flex-end' }}>
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
