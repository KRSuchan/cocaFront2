import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { DatePicker, List } from 'antd';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Calendar as AntCalendar } from 'antd';
import './MainPage.css'
import 'moment/locale/ko';  // Import Korean locale
import { useState, useEffect } from 'react';
import RCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from 'antd';
import { SmileOutlined, SearchOutlined, StarOutlined, SettingOutlined } from '@ant-design/icons';
import { ListGroup } from 'react-bootstrap'; // React Bootstrap 라이브러리에서 ListGroup 컴포넌트를 가져옵니다.
import MiniCalendar from './components/MiniCalendar';
import GroupsList from './components/GroupsList';
import MainCalendar from './components/MainCalendar';
import NewPage from './components/NewPage';
import ButtonPanel from './components/ButtonPanel';
import AddSchedulePage from './components/AddSchedulePage';
import axios from 'axios';

moment.locale('ko');

// Create the localizer
const localizer = momentLocalizer(moment);

// 일정 상세 통신
const getPersonalDetailSchedule = async (id, startDate, endDate) => {
    console.log(id, startDate, endDate);

    try {
        const res = axios.get(`http://localhost:8080/api/personal-schedule/detail/between-dates?memberId=${id}&startDate=${startDate}&endDate=${endDate}`);

        console.log(res);

        return (await res).data;
    } catch (error) {
        console.error("유저 상세 일정 불러오기 에러 : ", error);
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

// Define your reducer
// ✅ 그룹 목록 불러오기!
const initialState = {
    date: moment(),
    groups: ['내 캘린더', '앱 개발자 취뽀그룹', '플러터 개발자그룹', '재수생 스터디그룹'] // 더미 데이터 추가
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_DATE':
        return { ...state, date: action.payload };
      default:
        return state;
    }
  };
  
  // Create your Redux store
  const store = createStore(reducer);

const Logo= () => {
    return(
        <div className="logo-container">
                    <div style={{flexGrow: 1}}></div> 
                    <div className="logo-text">COCA</div> 
                </div>
    );
} 

function MainPage() {
    // 'default'와 'newPanel' 중 하나를 값으로 가질 수 있는 activePanel 상태 추가
    // 'default': 기본 left-panel을 보여줌, 'newPanel': 새로운 페이지를 left-panel에 보여줌
    const [activePanel, setActivePanel] = useState('default');
    const [selectedDate, setSelectedDate] = useState(''); // 선택한 날짜 상태 추가
    const [schedule, setSchedule] = useState([
        {
            title: "직방 마감",
            description: "Smarthome(App) Product Owner\n직군 Product planning\n경력 10년 이상, 근무지 soma"
        },
        {
            title: "프로젝트 리뷰",
            description: "오후 2시, Google Meet"
        }
    ]);

        
       // ✅ 캘린더 슬롯 선택시!
       const onSlotSelect = async (date) => {
        setSelectedDate(date); // 선택한 날짜를 상태로 저장
        
        console.log(date);
        try {
            const res = await getPersonalDetailSchedule(localStorage.getItem('userId'), date, date);

            if(res && res.code == 200) {
                setSchedule(res.data);
            } else {
                console.error("상세 일정 불러오기 실패")
            }
        } catch (error) {
            console.error("상세 일정 불러오기 에러 : ", error);
        }

        setActivePanel('newPanel');
    };

    return (
        <Provider store={store}>
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
                            <NewPage setActivePanel={setActivePanel} selectedDate={selectedDate} schedule={schedule} />                        
                        </div>
                    ) : (
                        <div className="add-schedule-page-container">
                            <AddSchedulePage setActivePanel={setActivePanel} selectedDate={selectedDate} />
                        </div>
                    )}
                </div>
                <div className="right-panel">
                    <MainCalendar onSlotSelect={onSlotSelect} />
                    <Logo/>
                </div>
            </div>
        </Provider>
    );
}

export default MainPage;
