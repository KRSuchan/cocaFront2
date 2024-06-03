import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Tabs, Card, Avatar, Button } from 'antd';
import styles from './css/NoticePage.module.css';

const { TabPane } = Tabs;

const NoticePage = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState('일정');
    const [schedules, setSchedules] = useState([
        {
            requestedScheduleId: 11,
            title: "일본여행",
            start: "2024-05-31T00:00:00",
            end: "2024-06-01T23:59:59",
            sender: {
                id: "TESTID1",
                name: "TESTNAME1",
                profileImagePath: "https://mblogthumb-phinf.pstatic.net/MjAxNzExMjBfNTcg/MDAxNTExMTQwODEzMDEz.ZsVbk5sliYQb0NHTk_GRCLn5ejrI9vWT4Z0MRkjQE2Eg.4ogUOYnL5jNFMH63iq732DolLGuciE0d7JwUh7f0pwEg.JPEG.japanian_story/%E5%BA%83%E7%80%AC%E3%81%99%E3%81%9A.jpg?type=w800"
            },
            status: "PENDING"
        },
        {
            requestedScheduleId: 12,
            title: "미국 출장",
            start: "2024-06-15T00:00:00",
            end: "2024-06-20T23:59:59",
            sender: {
                id: "TESTID2",
                name: "TESTNAME2",
                profileImagePath: ""
            },
            status: "CONFIRMED"
        }
    ]);
    const [friends, setFriends] = useState([
        {
            friendRequestId: 3,
            sender: {
                id: "TESTID1",
                name: "포뇨포포뇨",
                profileImagePath: "https://file.newswire.co.kr/data/datafile2/thumb_480/2008/12/2039103817_20081204102208_5415926347.jpg"
            },
            status: "PENDING"
        }
    ]);
    const [groups, setGroups] = useState([
        {
            groupRequestId: 1,
            groupId: 6,
            groupName: "테스트그룹2",
            sender: {
                id: "TESTID1",
                name: "TESTNAME1",
                profileImagePath: "https://i.namu.wiki/i/MuCO_ocla-FyadGnRZytkRLggQOcqxv_hXNjN7aYXDOPivIChJNdiRXp6vwSXbM6GcUL3pVTL-5U5TKQ0f1YhA.svg"
            },
            status: "PENDING"
        }
    ]);

    useEffect(() => {
        // 백엔드에서 추가적인 일정 데이터를 가져오는 로직은 생략
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleScheduleApproval = () => {
        // 일정 승인 버튼에 대한 함수
    };

    const handleScheduleRejection = () => {
        // 일정 거절 버튼에 대한 함수
    };

    const handleScheduleDeletion = () => {
        // 일정 삭제 버튼에 대한 함수
    };

    const handleFriendAcceptance = () => {
        // 친구 수락 버튼에 대한 함수
    };

    const handleFriendRejection = () => {
        // 친구 거절 버튼에 대한 함수
    };

    const handleFriendDeletion = () => {
        // 친구 삭제 버튼에 대한 함수
    };

    const handleGroupAcceptance = () => {
        // 그룹 수락 버튼에 대한 함수
    };

    const handleGroupRejection = () => {
        // 그룹 거절 버튼에 대한 함수
    };

    const handleGroupDeletion = () => {
        // 그룹 삭제 버튼에 대한 함수
    };

    const TabContent = () => (
        <Tabs activeKey={tab} onChange={key => setTab(key)}>
            <TabPane tab={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>일정</span>} key="일정">
                {schedules.map(schedule => (
                    <Card key={schedule.requestedScheduleId} style={{ width: '100%', marginTop: 16 }}>
                        <Card.Meta
                            avatar={<Avatar src={schedule.sender.profileImagePath || <UserOutlined />} />}
                            title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>{schedule.sender.name}님 / {schedule.title}</span>}
                            description={`${schedule.start} - ${schedule.end}`}
                        />
                        <div style={{ marginTop: '10px' }}>
                            {schedule.status === "PENDING" ? (
                                <>
                                    <Button type="primary" style={{ marginRight: '8px' }} onClick={handleScheduleApproval}>승인</Button>
                                    <Button type="danger" onClick={handleScheduleRejection}>거절</Button>
                                </>
                            ) : (
                                <Button type="danger" onClick={handleScheduleDeletion}>삭제</Button>
                            )}
                        </div>
                    </Card>
                ))}
            </TabPane>
            <TabPane tab={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>친구</span>} key="친구">
                {friends.map(friend => (
                    <Card key={friend.friendRequestId} style={{ width: '100%', marginTop: 16 }}>
                        <Card.Meta
                            avatar={<Avatar src={friend.sender.profileImagePath || <UserOutlined />} />}
                            title={<span style={{ fontSize: '16px', fontWeight: 'bold', color: '#41ADCA' }}>{friend.sender.name}</span>}
                        />
                        <div style={{ marginTop: '10px' }}>
                            {friend.status === "PENDING" ? (
                                <>
                                    <Button type="primary" style={{ marginRight: '8px' }} onClick={handleFriendAcceptance}>수락</Button>
                                    <Button type="danger" onClick={handleFriendRejection}>거절</Button>
                                </>
                            ) : (
                                <Button type="danger" onClick={handleFriendDeletion}>삭제</Button>
                            )}
                        </div>
                    </Card>
                ))}
            </TabPane>
            <TabPane tab={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>그룹</span>} key="그룹">
                {groups.map(group => (
                    <Card key={group.groupRequestId} style={{ width: '100%', marginTop: 16 }}>
                        <Card.Meta
                            avatar={<Avatar src={group.sender.profileImagePath || <UserOutlined />} />}
                            title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>{group.groupName}</span>}
                        />
                        <div style={{ marginTop: '10px' }}>
                            {group.status === "PENDING" ? (
                                <>
                                    <Button type="primary" style={{ marginRight: '8px' }} onClick={handleGroupAcceptance}>수락</Button>
                                    <Button type="danger" onClick={handleGroupRejection}>거절</Button>
                                </>
                            ) : (
                                <Button type="danger" onClick={handleGroupDeletion}>삭제</Button>
                            )}
                        </div>
                    </Card>
                ))}
            </TabPane>
        </Tabs>
    );

    return (
        <div className={styles.container} style={{ fontFamily: 'Noto Sans KR' }}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={handleBack}>{'<'}</button>
                <h1 className={styles.title}>알림</h1>
            </div>
            <div style={{ width: '100%', height: '100%' }}>
                <TabContent />
            </div>
        </div>
    );
};

export default NoticePage;
