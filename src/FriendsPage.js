import React, { useState, useEffect } from 'react';
import { Button, List, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './css/FriendsPage.module.css';
import { UserOutlined, CalendarOutlined, EditOutlined } from '@ant-design/icons';

const FriendsPage = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const [friends, setFriends] = useState([]);
    const [events, setEvents] = useState([]);
    const [calendarVisible, setCalendarVisible] = useState(false);

    useEffect(() => {
        const response = {
            "code": 200,
            "message": "OK",
            "data": [
                {
                    "friendId": 3,
                    "friendMemberId": "TESTID2",
                    "friendName": "벼랑위의표뇨",
                    "friendProfileImagePath": "https://mblogthumb-phinf.pstatic.net/MjAxODA2MDRfMjY5/MDAxNTI4MTExNjgyODQx.QtAlWz5AGylTqNbrUlY4fBjCvP0JVhMrizEFksV_e-Ag.z7yP9BuIpBoK9KmEAcRBq1TZQW7qnYQNWli71rnAESUg.PNG.hellokitty4427/1.png?type=w800"
                },
                {
                    "friendId": 4,
                    "friendMemberId": "TESTID3",
                    "friendName": "포뇨포뇨토토로",
                    "friendProfileImagePath": null
                }
            ]
        };
        setFriends(response.data);
    }, []);

    const handleCalendarClick = () => {
        const response = {
            "code": 200,
            "message": "OK",
            "data": [
                {
                    "title": "비공개 일정",
                    "startDateTime": "2024-05-22T00:00:00",
                    "endDateTime": "2024-05-23T23:59:59",
                    "isPrivate": true
                },
                {
                    "title": "임시 제목100",
                    "startDateTime": "2024-05-24T00:00:00",
                    "endDateTime": "2024-06-01T23:59:59",
                    "isPrivate": false
                },
                {
                    "title": "새로운 일정",
                    "startDateTime": "2024-06-02T00:00:00",
                    "endDateTime": "2024-06-10T23:59:59",
                    "isPrivate": false
                },
                {
                    "title": "또 다른 일정",
                    "startDateTime": "2024-06-15T00:00:00",
                    "endDateTime": "2024-06-20T23:59:59",
                    "isPrivate": true
                }
            ]
        };
        setEvents(response.data);
        setCalendarVisible(true);
    };

    const handleEditClick = (friendId) => {
        console.log(friendId);
        // 편집 버튼 클릭 이벤트
    };

    const handleFriendClick = (friendId) => {
        console.log(friendId);
    };

    const CalendarPanel = ({ events }) => (
        <div style={{ backgroundColor: 'lightgray', padding: '10px', borderRadius: '5px', margin: '10px', overflowX: 'auto' }}>
            <table style={{ width: '110%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {[...Array(7)].map((_, index) => (
                            <th key={index} style={{ border: '1px solid black', padding: '10px' }}>{new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {[...Array(7)].map((_, index) => (
                            <td key={index} style={{ border: '1px solid black', padding: '10px' }}>
                                {events.find(event => new Date(event.startDateTime).toLocaleDateString() === new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString())?.title}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div className={styles.container} style={{ fontFamily: 'Noto Sans KR' }}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={handleBack}>{'<'}</button>
                <h1 className={styles.title}>친구</h1>
            </div>
            <div className={styles.panelContainer} style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <div className={styles.leftPanel} style={{
                    width: '50%',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '20px',
                    margin: '20px'
                }}>
                    {/* 좌측패널 - 친구 목록 */}
                    {friends.map(friend => (
                        <div key={friend.friendId} className={styles.friendItem} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', border: '1px solid lightgray', borderRadius: '10px', padding: '15px', backgroundColor: 'aliceblue' }} onClick={() => handleFriendClick(friend.friendId)}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {friend.friendProfileImagePath ? (
                                    <Avatar src={friend.friendProfileImagePath} size={40} style={{ marginRight: '15px' }} />
                                ) : (
                                    <Avatar icon={<UserOutlined />} size={40} style={{ marginRight: '15px' }} />
                                )}
                                <span style={{ fontFamily: 'Noto Sans Kr', fontSize: '24px', fontWeight: 'bold', color: 'navy' }}>{friend.friendName}</span>
                            </div>
                            <div className={styles.icons}>
                                <Button type="primary" size="medium" style={{ marginRight: 12, backgroundColor: 'skyblue', color: 'white' }} onClick={handleCalendarClick}><CalendarOutlined /></Button>
                                <Button type="danger" size="medium" style={{ backgroundColor: 'salmon', color: 'white' }} onClick={() => handleEditClick(friend.friendId)}><EditOutlined /></Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.rightPanel} style={{
                    width: '50%',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '20px',
                    margin: '20px'
                }}>
                    {/* 우측패널 - 추가 기능 */}
                    <CalendarPanel events={events} />
                </div>
            </div>
        </div>
    );
}

export default FriendsPage;