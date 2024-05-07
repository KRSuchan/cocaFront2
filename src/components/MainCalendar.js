// MainCalendar.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

moment.locale('ko');

// Create the localizer
const localizer = momentLocalizer(moment);

const MainCalendar = ({onSlotSelect}) => {
    const [events, setEvents] = useState([
        {
            start: new Date(2024, 4, 1), // 5월 1일 (월은 0부터 시작하므로 4가 5월을 의미합니다)
            end: new Date(2024, 4, 1),
            title: '코딩',
        },
        {
            start: new Date(2024, 4, 17), // 5월 1일 (월은 0부터 시작하므로 4가 5월을 의미합니다)
            end: new Date(2024, 4, 20),
            title: '일본여행',
        },
    ]);

    const [selectedDate, setSelectedDate] = useState(null);

    // 선택한 날짜에 대한 이벤트를 찾는 함수
    const findEventsForSelectedDate = (date) => {
        return events.filter(event => {
            const eventStart = new Date(event.start).setHours(0, 0, 0, 0);
            const eventEnd = new Date(event.end).setHours(0, 0, 0, 0);
            const selectedDate = new Date(date).setHours(0, 0, 0, 0);
            return selectedDate >= eventStart && selectedDate <= eventEnd;
        });
    };

    // const handleSelectEvent = event => {
    //     setSelectedDate({ start: event.start, end: event.end });
    // };

    // 캘린더 슬롯 선택시 메인페이지의 메소드 실행함
    const handleSelectSlot = slotInfo => {
        // 선택한 슬롯의 시작 날짜를 YYYY-MM-DD 형식의 문자열로 변환
        const startDate = slotInfo.end.toISOString().split('T')[0];
        onSlotSelect(startDate); // 날짜 정보를 인자로 전달
    };
    

    useEffect(() => {
        if (selectedDate) {
            window.alert(`선택한 날짜: ${selectedDate.start} - ${selectedDate.end}`);
        }
    }, [selectedDate]);

    return (
        <div className="calendar-component-main">
            <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                views={['month']}
                selectable={true} // 이 부분을 확인해주세요.
                // onSelectEvent={handleSelectEvent} // 일정 선택 시 handleSelectEvent 함수 호출
                onSelectSlot={handleSelectSlot} // 빈 슬롯 선택 시 handleSelectSlot 함수 호출
            />
        </div>
    );
};

export default MainCalendar;