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
const reducer = (state = { date: moment() }, action) => {
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

const GroupsList = () => {
    // Assume groups is an array of group names
    const groups = useSelector(state => state.groups);

    return (
        <div className="calendar-component">
            <List
                dataSource={groups}
                renderItem={group => <List.Item>{group}</List.Item>}
            />
        </div>
    );
};


const ButtonPanel = () => {
    return (
        <div className="button-panel">
            <Button icon={<SmileOutlined style={{ fontSize: '20px' }} />} className="button disappointment">
                <div>실망</div>
            </Button>
            <Button icon={<SearchOutlined style={{ fontSize: '20px' }} />} className="button green-color">
                <div>그린색상</div>
            </Button>
            <Button icon={<StarOutlined style={{ fontSize: '20px' }} />} className="button violet">
                <div>비올레차쥐</div>
            </Button>
            <Button icon={<SettingOutlined style={{ fontSize: '20px' }} />} className="button navy-blue">
                <div>네이청</div>
            </Button>
        </div>
    );
};



const MainCalendar = () => {
    const events = useSelector(state => state.events);

    return (
        <div className="calendar-component">
            <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
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
