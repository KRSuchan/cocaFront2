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
import { useState } from 'react';
import RCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from 'antd';
import { SmileOutlined, SearchOutlined, StarOutlined, SettingOutlined } from '@ant-design/icons';
import { ListGroup } from 'react-bootstrap'; // React Bootstrap 라이브러리에서 ListGroup 컴포넌트를 가져옵니다.

moment.locale('ko');

// Create the localizer
const localizer = momentLocalizer(moment);

// Define your updateDate action creator
const updateDate = (newDate) => {
  return {
    type: 'UPDATE_DATE',
    payload: newDate
  };
};

// Define your reducer
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
  

//미니캘린더 버전2 = React Calendar
const MiniCalendar = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };

    const formatShortWeekday = (locale, date) => {
        return ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    };

    const formatDay = (locale, date) => {
        return date.getDate().toString();
    };

    return (
        <div className="calendar-component">
            <RCalendar 
                onChange={onChange} 
                value={date} 
                formatShortWeekday={formatShortWeekday}
                formatDay={formatDay}
            />
        </div>
    );
};

//그룹리스트 버전 1 antd
// const GroupsList = () => {
//     // Assume groups is an array of group names
//     const groups = useSelector(state => state.groups);

//     const handleClick = (group) => {
//         alert(`You clicked on ${group}`); // 브라우저 알림창 표시
//     };

//     return (
//         <div className="calendar-component">
//             <List
//                 dataSource={groups}
//                 renderItem={group => (
//                     <List.Item style={{ borderRadius: '15px', backgroundColor: '#f8f9fa', marginBottom: '10px', padding: '10px' }} onClick={() => handleClick(group)}>
//                         {group}
//                     </List.Item>
//                 )}
//             />
//         </div>
//     );
// };

const GroupsList = () => {
    // Assume groups is an array of group names
    const groups = useSelector(state => state.groups);

    const [selectedGroup, setSelectedGroup] = useState(null); // 선택된 그룹을 추적하는 상태 변수를 추가합니다.

    const handleClick = (group) => {
        setSelectedGroup(group); // 클릭한 그룹을 선택된 그룹으로 설정합니다.
    };

    return (
        <div className="calendar-component">
            <ListGroup variant="flush">
                {groups.map(group => (
                    <ListGroup.Item 
                        style={{ 
                            borderRadius: '15px', 
                            backgroundColor: group === selectedGroup ? '#4CB3FF' : '#f8f9fa', // 선택된 그룹이면 배경색을 변경합니다.
                            color: group === selectedGroup ? 'white' : 'black', // 선택된 그룹이면 글자색을 변경합니다.
                            marginBottom: '10px', 
                            padding: '10px',
                            fontFamily: 'Noto Sans KR', // 폰트를 설정합니다.
                            fontWeight: group === selectedGroup ? 'bold' : 'normal' // 선택된 그룹이면 글자를 굵게 합니다.
                        }} 
                        onClick={() => handleClick(group)}
                    >
                        {group}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};


const ButtonPanel = () => {
    return (
        <div className="button-panel">
            <Button icon={<SmileOutlined style={{ fontSize: '30px' }} />} className="button disappointment">
                <div>친구</div>
            </Button>
            <Button icon={<SearchOutlined style={{ fontSize: '30px' }} />} className="button green-color">
                <div>그룹검색</div>
            </Button>
            <Button icon={<StarOutlined style={{ fontSize: '30px' }} />} className="button violet">
                <div>빈일정</div>
            </Button>
            <Button icon={<SettingOutlined style={{ fontSize: '30px' }} />} className="button navy-blue">
                <div>내설정</div>
            </Button>
        </div>
    );
};


const MainCalendar = () => {
    const events = useSelector(state => state.events);

    return (
        <div className="calendar-component" style={{ height: '100%' }}> {/* 부모 요소의 높이를 100%로 설정 */}
            <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }} // 캘린더의 높이를 100%로 설정
            />
        </div>
    );
    
};

function MainPage() {
    return (
        <Provider store={store}>
            <div className="App">
                <div className="left-panel">
                    <MiniCalendar />
                    <div className="group-and-button">
                        <GroupsList />
                        <ButtonPanel />
                    </div>
                </div>
                <div className="right-panel">
                    <MainCalendar />
                </div>
            </div>
        </Provider>
    );
}

export default MainPage;
