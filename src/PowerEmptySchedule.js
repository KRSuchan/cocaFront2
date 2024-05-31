import React, { useState, useRef, useEffect } from 'react';
import styles from './css/PowerEmptySchedule.module.css';
import { useNavigate } from 'react-router-dom';
import { DatePicker, InputNumber, Select, Button, Input, Modal, Tabs, List, Avatar } from 'antd';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import moment from 'moment';
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일 추가
import { UserOutlined } from '@ant-design/icons'; // antd 아이콘 추가
import Swal from 'sweetalert2'; // Swal 추가

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

const PowerEmptySchedule = () => {
    const navigate = useNavigate();
    const calendarRef = useRef(null);
    const [number, setNumber] = useState(1); // 숫자 (N)
    const [unit, setUnit] = useState('일'); // '일', '시간'
    const [range, setRange] = useState(null); //시작일 끝일
    const [schedules, setSchedules] = useState([]);
    const [emptySchedules, setEmptySchedules] = useState([]); // 빈일정
    const [members, setMembers] = useState([
        { id: 1, name: '아이유에오', photo: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202306/04/138bdfca-3e86-4c09-9632-d22df52a0484.jpg' },
        { id: 2, name: '멤브레인', photo: 'https://i.pinimg.com/originals/c1/65/ae/c165ae2cbbf02e148743a4a7400ad0f5.jpg' },
        { id: 3, name: '멤버 3', photo: '' },
        { id: 4, name: '멤버 4', photo: '' },
    ]); // 멤버 목록 상태 추가
    const [newMemberName, setNewMemberName] = useState(''); // 새 멤버 이름 입력을 위한 상태
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 상태
    const [friends, setFriends] = useState([]); // 친구 목록 상태
    const [selectedFriend, setSelectedFriend] = useState(null); // 선택된 친구 상태
    const [groups, setGroups] = useState([
        { groupId: 11, groupName: "수정NAME", isAdmin: true },
        { groupId: 13, groupName: "테스트그룹7", isAdmin: true }
    ]); // 내가 가입한 그룹 목록
    const [groupMembers, setGroupMembers] = useState([]); // 선택된 그룹의 멤버 목록
    const [selectedGroup, setSelectedGroup] = useState(null); // 선택된 그룹

    useEffect(() => {
        // 친구 목록을 받아오는 함수
        const fetchFriends = async () => {
            const friendData = [
                {
                    friendId: 3,
                    friendMemberId: "TESTID2",
                    friendName: "TESTNAME2",
                    friendProfileImagePath: "TESTURL2"
                },
                {
                    friendId: 4,    
                    friendMemberId: "TESTID3",
                    friendName: "TESTNAME3",
                    friendProfileImagePath: "TESTURL3"
                }
            ];
            setFriends(friendData);
        };

        fetchFriends();
    }, []);

    useEffect(() => {
        // 선택된 그룹의 멤버 목록을 받아오는 함수
        const fetchGroupMembers = async () => {
            if (selectedGroup) {
                const membersData = [
                    { id: "TESTID1", userName: "TESTNAME1", profileImgPath: "TESTURL1" }
                ];
                setGroupMembers(membersData);
            }
        };

        fetchGroupMembers();
    }, [selectedGroup]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleNumberChange = (value) => {
        setNumber(value);
    };

    const handleUnitChange = (value) => {
        setUnit(value);
    };

    const handleRangeChange = (dates) => {
        setRange(dates);
    };

    const handleSearch = async () => { //✌️찾기버튼 눌렀을떄! unit에서 일인지 시간인 확인해야 함. 
        // 일정 데이터를 받
        const fetchSchedules = async () => {
            const data = [
                [
                    { startTime: "2024-05-01", endTime: "2024-07-02" },
                    { startTime: "2024-07-10", endTime: "2024-08-02" },
                    { startTime: "2024-09-21", endTime: "2024-12-31" },
                    { startTime: "2025-01-01", endTime: "2025-03-31" },
                    { startTime: "2025-04-01", endTime: "2025-06-30" }
                ],
                [
                    { startTime: "2024-06-01", endTime: "2024-08-01" },
                    { startTime: "2024-08-10", endTime: "2024-10-20" },
                    { startTime: "2024-10-21", endTime: "2025-01-31" },
                    { startTime: "2025-02-01", endTime: "2025-04-30" },
                    { startTime: "2025-05-01", endTime: "2025-07-30" }
                ],
                [
                    { startTime: "2024-06-01", endTime: "2024-08-01" },
                    { startTime: "2024-08-11", endTime: "2024-10-20" },
                    { startTime: "2024-10-21", endTime: "2025-01-31" },
                    { startTime: "2025-02-01", endTime: "2025-04-30" },
                    { startTime: "2025-05-01", endTime: "2025-07-30" }
                ]
            ];
            setSchedules(data);
        };

        // 빈일정 데이터를 받아오는 함수
        const fetchEmptySchedules = async () => {
            const emptyData = [
                { startTime: "2024-08-02", endTime: "2024-08-06" },
                { startTime: "2024-08-03", endTime: "2024-08-07" },
                { startTime: "2024-08-04", endTime: "2024-08-08" },
                { startTime: "2024-08-05", endTime: "2024-08-09" },
                { startTime: "2024-08-06", endTime: "2024-08-10" }
            ];
            setEmptySchedules([emptyData]);
        };

        await fetchSchedules();
        await fetchEmptySchedules();

        if (range && range.length === 2) {
            const calendarApi = calendarRef.current.getApi();
            const startDate = range[0].toDate();
            const endDate = range[1].toDate();
            const duration = moment(endDate).diff(moment(startDate), 'months') + 1; // 월 단위로 계산

            calendarApi.gotoDate(startDate); // 선택된 범위의 시작 날짜로 이동

            // FullCalendar의 view를 업데이트
            if (unit === '일') {
                calendarApi.changeView('customRange', {
                    duration: { months: 13 },
                    visibleRange: {
                        start: startDate,
                        end: endDate
                    }
                });
            } else if (unit === '시간') {
                calendarApi.changeView('customHourRange', {
                    duration: { hours: 430 }, // 49주를 일수로 변환
                    visibleRange: {
                        start: startDate,
                    },
                    slotLabelFormat: [
                        { month: 'short', day: 'numeric', weekday: 'short' }, // 상위 레벨: 월, , 요일
                        { hour: '2-digit', minute: '2-digit', hour12: false } // 하위 레벨: 시간
                    ]
                });
            }
        }
    };

    const handleReset = () => {
        setSchedules([]);
        setEmptySchedules([]);
        setRange(null);
        setNumber(1);
        setUnit('일');
        const calendarApi = calendarRef.current.getApi();
        calendarApi.removeAllEvents();
    };

    // 새 멤버 추가 함수
    const handleAddMember = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        if (selectedFriend) {
            const newMember = {
                id: members.length + 1,
                name: selectedFriend.friendName,
                photo: selectedFriend.friendProfileImagePath
            };
            setMembers([...members, newMember]);
            setSelectedFriend(null); // 선택된 친구 초기화
        }
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    // 멤버 삭제 함수
    const handleDeleteMember = (id) => {
        setMembers(members.filter(member => member.id !== id));
    };

    const handleEventClick = (info) => {
        const event = info.event;
        const startTime = moment(event.start).format('YYYY-MM-DD HH:mm');
        const endTime = moment(event.end).format('YYYY-MM-DD HH:mm');

        Swal.fire({
            title: '일정 수정',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="제목" value="${event.title}">
                <input id="swal-input2" class="swal2-input" placeholder="내용">
                <input id="swal-input3" class="swal2-input" type="datetime-local" value="${startTime}">
                <input id="swal-input4" class="swal2-input" type="datetime-local" value="${endTime}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const title = document.getElementById('swal-input1').value;
                const content = document.getElementById('swal-input2').value;
                const start = document.getElementById('swal-input3').value;
                const end = document.getElementById('swal-input4').value;

                if (title && start && end) {
                    console.log('Title:', title);
                    console.log('Content:', content);
                    console.log('Start:', start);
                    console.log('End:', end);

                    // 멤버들의 id 출력
                    members.forEach(member => {
                        console.log('Member ID:', member.id);
                    });
                }
            }
        });
    };

    const ScheduleSearch = () => {
        // 기존 일정 이벤트
        const events = schedules.flatMap((scheduleList, listIdx) =>
            scheduleList.map((schedule, idx) => ({
                id: `schedule-${listIdx}-${idx}`,
                resourceId: `member-${listIdx}`,
                start: schedule.startTime,
                end: schedule.endTime,
                title: `일정 ${listIdx + 1}-${idx + 1}`,
                color: '#4A90E2' // 새로 일정 색상 설정 (파란)
            }))
        );

        // 빈 일정 벤트 추가
        const emptyEvents = emptySchedules[0] ? emptySchedules[0].map((empty, idx) => ({
            id: `empty-${idx}`,
            resourceId: 'zempty', // 모든 빈 일정은 같은 리소스 ID를 사용
            start: empty.startTime,
            end: empty.endTime,
            title: `빈 일정 ${idx + 1}`,
            color: '#E94E77' // 새로운 빈 일정 색상 설 (분홍색)
        })) : [];

        // 기존 일정과 빈 일정을 합친 새로운 이벤트 배열
        const combinedEvents = [...events, ...emptyEvents];

        // 리소스 배열 수정 (빈 일정을 마지막에 추가)
        const resources = [
            ...schedules.map((_, idx) => ({
                id: `member-${idx}`,
                title: `멤버 ${idx + 1}`
            })),
            {
                id: 'zempty',
                title: '빈 일정'
            }
        ];

        return (
            <FullCalendar
                ref={calendarRef}
                plugins={[resourceTimelinePlugin]}
                initialView="resourceTimelineDay"
                locale={koLocale}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'customHourRange,customRange'
                }}
                views={{
                    resourceTimelineYear: {
                        type: 'resourceTimeline',
                        duration: { years: 1 },
                        buttonText: '연간'
                    },
                    customRange: {
                        type: 'resourceTimeline',
                        duration: { months: 13 },
                        buttonText: '일자범위',
                        slotLabelFormat: [
                            { month: 'short' }, // 상위 레벨: 월, 일, 요일
                            { day: 'numeric' }, // 하위 레벨: 일
                        ]
                    },
                    customHourRange: {
                        type: 'resourceTimeline',
                        duration: { hours: 430 }, 
                        buttonText: '시간범위',
                        slotLabelFormat: [
                            { month: 'short', day: 'numeric', weekday: 'short' }, // 상위 레벨: 월, 일, 요일
                            { hour: '2-digit', minute: '2-digit', hour12: false } // 하위 레벨: 시간
                        ]
                    }
                }}
                resources={resources}
                events={combinedEvents}
                editable={true}
                selectable={true}
                eventOverlap={false} // 이벤트 겹침 방지
                resourceAreaWidth="20%"
                slotMinWidth={100}
                eventClick={handleEventClick} // 이벤트 클릭 핸들러 추가
            />
        );
    };

    return (
        <div className={styles.container} style={{ fontFamily: 'Noto Sans KR' }}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={handleBack}>{'<'}</button>
                <h1 className={styles.title}>빈일정찾기</h1>
            </div>
            <div className={styles.subPanel}>
                <RangePicker getPopupContainer={trigger => trigger.parentNode} onChange={handleRangeChange} />
                <InputNumber min={1} max={10} value={number} onChange={handleNumberChange} style={{ marginLeft: '20px' }} />
                <Select value={unit} onChange={handleUnitChange} getPopupContainer={trigger => trigger.parentNode} style={{ width: '100px', marginLeft: '20px' }}>
                    <Option value="일">일</Option>
                    <Option value="시간">시간</Option>
                </Select>
                <button 
                    onClick={handleSearch} 
                    style={{ 
                        background: 'linear-gradient(315deg, #A031E4, #E492F8)', 
                        color: 'white', 
                        marginLeft: '20px', 
                        padding: '5px 10px', 
                        border: 'none', 
                        borderRadius: '5px', 
                        transition: 'background 0.3s, transform 0.3s' 
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'linear-gradient(315deg, #A031E4, #D482F8)'}
                    onMouseLeave={(e) => e.target.style.background = 'linear-gradient(315deg, #A031E4, #E492F8)'}
                    onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                    onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                >
                    찾기
                </button>
                <button 
                    onClick={handleReset} 
                    style={{ 
                        background: 'linear-gradient(315deg, #A031E4, #E492F8)', 
                        color: 'white', 
                        marginLeft: '10px', 
                        padding: '5px 10px', 
                        border: 'none', 
                        borderRadius: '5px', 
                        transition: 'background 0.3s, transform 0.3s' 
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'linear-gradient(315deg, #A031E4, #D482F8)'}
                    onMouseLeave={(e) => e.target.style.background = 'linear-gradient(315deg, #A031E4, #E492F8)'}
                    onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                    onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                >
                    초기화
                </button>
                
            </div>
            <div className={styles.subPanel} style={{ display: 'flex', overflowX: 'auto', justifyContent: 'flex-start', height: '40px' }}>
                <Button onClick={handleAddMember} style={{ marginRight: '10px' }}>멤버 추가</Button>
                {members.map(member => (
                    <div key={member.id} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                        {member.photo ? (
                            <img 
                                src={member.photo}
                                alt={member.name} 
                                style={{ borderRadius: '50%', marginRight: '10px', width: '40px', height: '40px' }}
                            />
                        ) : (
                            <UserOutlined style={{ fontSize: '40px', marginRight: '10px' }} /> // 기본 아이콘 사용
                        )}
                        <span 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={(e) => e.target.style.color = 'red'}
                            onMouseLeave={(e) => e.target.style.color = 'black'}
                            onClick={() => handleDeleteMember(member.id)}
                        >
                            {member.name}
                        </span>
                    </div>
                ))}
            </div>
            <div className={styles.mainPanel} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px', marginTop: '10px' }}>
                <ScheduleSearch />
            </div>
            <Modal title="멤버 추가" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel} destroyOnClose>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="친구선택" key="1">
                        <List
                            itemLayout="horizontal"
                            dataSource={friends}
                            renderItem={friend => (
                                <List.Item
                                    onClick={() => setSelectedFriend(friend)}
                                    style={{ cursor: 'pointer', backgroundColor: selectedFriend?.friendId === friend.friendId ? '#e6f7ff' : 'transparent' }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={friend.friendProfileImagePath} icon={!friend.friendProfileImagePath && <UserOutlined />} />}
                                        title={friend.friendName}
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane tab="그룹멤버" key="2">
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1, marginRight: '10px' }}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={groups}
                                    renderItem={group => (
                                        <List.Item
                                            onClick={() => setSelectedGroup(group)}
                                            style={{ cursor: 'pointer', backgroundColor: selectedGroup?.groupId === group.groupId ? '#e6f7ff' : 'transparent' }}
                                        >
                                            <List.Item.Meta
                                                title={group.groupName}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={groupMembers}
                                    renderItem={member => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src={member.profileImgPath} icon={!member.profileImgPath && <UserOutlined />} />}
                                                title={member.userName}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Modal>
        </div>
    );
};

export default PowerEmptySchedule;
