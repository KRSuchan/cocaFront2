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

const MiniCalendar = () => {
    const date = useSelector(state => state.date);
    const dispatch = useDispatch();

    const handlePrevMonth = () => {
        dispatch(updateDate(moment(date).subtract(1, 'months')));
    };

    const handleNextMonth = () => {
        dispatch(updateDate(moment(date).add(1, 'months')));
    };

    return (
        <div className="calendar-component">
            <div>
                <LeftOutlined onClick={handlePrevMonth} />
                <DatePicker 
                    picker="month"
                    value={date} 
                    onChange={(newDate) => dispatch(updateDate(newDate))}
                />
                <RightOutlined onClick={handleNextMonth} />
            </div>
            <AntCalendar value={date} mode="month" fullscreen={false} />
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
                    <GroupsList />
                </div>
                <div className="right-panel">
                    <MainCalendar />
                </div>
            </div>
        </Provider>
    );
}

export default MainPage;
