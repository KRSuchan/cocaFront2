import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { DatePicker, List } from 'antd';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarOutlined, LeftOutlined, RightOutlined, BellOutlined } from '@ant-design/icons';
import { Calendar as AntCalendar } from 'antd';
import './css/MainPage.css'
import 'moment/locale/ko';  // Import Korean locale
import { useState, useEffect } from 'react';
import RCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from 'antd';
import { SmileOutlined, SearchOutlined, StarOutlined, SettingOutlined,LogoutOutlined } from '@ant-design/icons';
import { ListGroup } from 'react-bootstrap'; // React Bootstrap 라이브러리에서 ListGroup 컴포넌트를 가져옵니다.
import MiniCalendar from './components/MiniCalendar';
import GroupsList from './components/GroupsList';
import MainCalendar from './components/MainCalendar';
import NewPage from './components/NewPage';
import ButtonPanel from './components/ButtonPanel';
import AddSchedulePage from './components/AddSchedulePage';
import MainLogo from './components/MainLogo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

moment.locale('ko');

// Create the localizer
const localizer = momentLocalizer(moment);

// 일정 상세 통신
const getPersonalDetailSchedule = async (id, startDate, endDate) => {
    console.log(id, startDate, endDate);

    try {
        const res = axios.get(process.env.REACT_APP_SERVER_URL + `/api/personal-schedule/detail/date?memberId=${id}&date=${startDate}`);

        console.log("res", res);

        return (await res).data;
    } catch (error) {
        console.error("유저 상세 일정 불러오기 에러 : ", error);
        return null;
    }
}

const getGroupDetailSchedule = async (groupId, memberId, inquiryDate) => {
    try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/api/group-schedule/groupScheduleSpecificReq`, {
            params: {
                groupId: groupId,
                memberId: memberId,
                inquiryDate: inquiryDate
            }
        });

        return res.data;
    } catch (error) {
        console.error("그룹 상세 일정 불러오기 에러 :", error);
        return null;
    }
}

// Define your updateDate action creator
const updateDate = (newDate) => {
  return {
    type: 'UPDATE_DATE',
    payload: newDate
  };
};

const setGroups = (groups) => {
    return {
        type: 'SET_GROUPS',
        payload: groups
    };
};

const getGroupList = async (id) => {
    try {
        const res = axios.get(process.env.REACT_APP_SERVER_URL + `/api/calendar/member/${id}`);

        console.log("list", res);

        return (await res).data.data;
    } catch (error) {
        console.error(error);
    }

    return [];
}

function MainPage() {
    // 'default'와 'newPanel' 중 하나를 값으로 가질 수 있는 activePanel 상태 추가
    // 'default': 기본 left-panel을 보여줌, 'newPanel': 새로운 페이지를 left-panel에 보여줌
    const [editingSchedule, setEditingSchedule] = useState(null); // 편집 중인 일정 상태
    const [activePanel, setActivePanel] = useState('default');
    const [selectedDate, setSelectedDate] = useState(''); // 선택한 날짜 상태 추가
    const [schedule, setSchedule] = useState([
        {
            title: "직방 마감",
            description: "Smarthome(App) Product Owner\n직군 Product planning\n경력 10년 이상, 근무지 soma",
            id: '142',
            color: '#479950',
            isPrivate: true, 
            description: "임시 내용1Smarthome(App) Product Owner 직군 Product planning경력 10년 이상, 근무지 soma",
            location: "토스본사",
            startTime: "2024-04-17 00:00:01", 
            endTime: "2024-04-20 00:00:01",
            attachments: [
                {
                    "fileName": "관련서류",
                    "filePath": "testUrl1"
                },
                {
                    "fileName": "testName2",
                    "filePath": "testUrl2"
                }
            ]
        },
        {
            title: "프로젝트 리뷰",
            description: "오후 2시, Google Meet",
            id: '142',
            color: '#D06B74',
            isPrivate: true, 
            description: "개인정보를 취급하는 민간사업자 및 공공기관에서 개인정보 보호조치 사항에 대한 자율적인 점검을 통하여 개인정보 보호수준을 진단하고 개선할 수 있도록 지원하는 서비스입니다.            ",
            location: "집1",
            attachments: [
                {
                    "fileName": "testName1",
                    "filePath": "testUrl1"
                }
            ]
        }
    ]);

    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups);

    useEffect(() => {
        const fetchGroups = async () => {
            const userId = localStorage.getItem('userId');
            if(userId) {
                const res = await getGroupList(userId);
                dispatch(setGroups(res));
            }
        };

        fetchGroups();
    }, [dispatch]);

    const selectedGroup = useSelector(state => state.selectedGroup);

        
       // ✅ 캘린더 슬롯 선택시!
       const onSlotSelect = async (date) => {
        setSelectedDate(date); // 선택한 날짜를 상태로 저장
        
        console.log(date);
        try {
            let res;

            console.log('selGId', selectedGroup);

            if(selectedGroup.groupId === -1) {
                res = await getPersonalDetailSchedule(localStorage.getItem('userId'), date);
            } else {
                res = await getGroupDetailSchedule(selectedGroup.groupId, localStorage.getItem('userId'), date);
            }

            console.log('res3', res);

            if(res && res.code == 200) {
                setSchedule(res.data);
            } else {
                console.error("상세 일정 불러오기 실패", res);
            }
        } catch (error) {
            console.error("상세 일정 불러오기 에러 : ", error);
        }

        setActivePanel('newPanel');
    };

    return (
            <div className="App">
                <div className="left-panel">
                    {activePanel === 'default' ? (
                        <React.Fragment>
                            <div className="mini-calendar-container">
                                <MiniCalendar />
                            </div>
                            <div className="group-and-button">
                                <div className="groups-list-container">
                                    <GroupsList />
                                </div>
                                <div className="button-panel-container">
                                    <ButtonPanel />
                                </div>
                            </div>
                        </React.Fragment>
                    ) : activePanel === 'newPanel' ? (
                        <div className="new-page-container">
                            <NewPage setActivePanel={setActivePanel} selectedDate={selectedDate} schedule={schedule} setEditingSchedule={setEditingSchedule}/>                        
                        </div>
                    ) : activePanel === 'editSchedule' ? (
                        <div className="add-schedule-page-container">
                            <AddSchedulePage setActivePanel={setActivePanel} selectedDate={selectedDate} editingSchedule={editingSchedule} />
                        </div>
                    ) : 
                    (
                        <div className="add-schedule-page-container">
                            <AddSchedulePage setActivePanel={setActivePanel} selectedDate={selectedDate} />
                        </div>
                    )}
                </div>
                <div className="right-panel">
                    <MainCalendar onSlotSelect={onSlotSelect} />
                    <MainLogo/>
                </div>
            </div>
    );
}

export default MainPage;
