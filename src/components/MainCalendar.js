// MainCalendar.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { refreshAccessToken } from '../security/TokenManage';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

moment.locale('ko');

// test355
// test45

// Create the localizer
const localizer = momentLocalizer(moment);

// 메인페이지 일정 정보 통신
const getPersonalSchedule = async (id,  startDate, endDate, navigate) => {
    console.log(id, startDate, endDate);

    const accessToken = localStorage.getItem('accessToken');

     try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/api/personal-schedule/summary/between-dates?memberId=${id}&startDate=${startDate}&endDate=${endDate}`, config);

        console.log(res);

        if(res.data.code === 200) {
            return res.data.data;
        }
        else if(res.data.code === 401) {
            await refreshAccessToken(navigate);
            getPersonalSchedule(id, startDate, endDate, navigate);
        } else {
            throw new Error('unknown Error');
        }
        
    } catch (error) {
        console.error("유저 일정 불러오기 에러 : ", error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "에러!",
            text: "서버와의 통신에 문제가 생겼어요!",
            showConfirmButton: false,
            timer: 1500
        });
        return null;
    }
}

const getGroupScehdule = async(groupId, memberId, startDate, endDate, navigate) => {
    const accessToken = localStorage.getItem('accessToken');

     try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                groupId: groupId,
                memberId: memberId,
                startDate: startDate,
                endDate: endDate
            }
        };
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/api/group-schedule/groupScheduleSummaryReq`, config);

        console.log('gr'. res);

        if(res.data.code === 200) {
            return res.data.data;
        }
        else if(res.data.code === 401) {
            await refreshAccessToken(navigate);
            getGroupScehdule(groupId, memberId, startDate, endDate, navigate);
        } else {
            throw new Error('unknown Error');
        }
    } catch (error) {
        console.error("그룹 일정 불러오기 에러 :", error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "에러!",
            text: "서버와의 통신에 문제가 생겼어요!",
            showConfirmButton: false,
            timer: 1500
        });
        return null;
    }
}

const MainCalendar = ({onSlotSelect}) => {
    const navigate = useNavigate();
    const selectedGroup = useSelector(state => state.selectedGroup);
    const [currentGroup, setCurrentGroup] = useState(selectedGroup || {groupId: -1});
    
    const localStorageDate = localStorage.getItem('savedDate');
    let savedDate = null;
    if(localStorageDate) {
        savedDate = new Date(localStorageDate);
    } else {
        savedDate = new Date();
    }
    // const [savedDate, setSavedDate] = useState(new Date());
    console.log("sd : ", savedDate);

    // useEffect(() => {
    //     const savedDate = localStorage.getItem('savedDate');
    //     if (savedDate) {
    //       setSavedDate(new Date(savedDate));
    //     }
    //   }, []);


    const [events, setEvents] = useState([
        {
            start: new Date(2024, 4, 1), // 5월 1일 (월은 0부터 시작하므로 4가 5월을 의미합니다)
            end: new Date(2024, 4, 1),
            description: "임시 내용1",
            title: '코딩',

        },
        {
            start: new Date(2024, 4, 17), // 5월 1일 (월은 0부터 시작하므로 4가 5월을 의미합니다)
            end: new Date(2024, 4, 20),
            title: '일본여행',
                id: '141',
                color: '#479950',
                isPrivate: true,        
                description: "임시 내용1Smarthome(App) Product Owner 직군 Product planning경력 10년 이상, 근무지 soma",
        },
        {
            start: new Date(2024, 3, 29), // 5월 1일 (월은 0부터 시작하므로 4가 5월을 의미합니다)
            end: new Date(2024, 3, 30),
            title: '호주여행',
            id: '142',
            color: '#D7AA66',
            isPrivate: true, 
            description: "임시 내용1",
            location: "집1",
            attachments: [
                {
                    "fileName": "testName1",
                    "filePath": "testUrl1"
                },
                {
                    "fileName": "testName2",
                    "filePath": "testUrl2"
                }
            ]
        },
    ]);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleNavigate = async (date) => {
        localStorage.setItem('savedDate', date);

        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth() + 1;
        const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

        const paddedMonth = String(currentMonth).padStart(2, '0');

        const finalStartDate = `${currentYear}-${paddedMonth}-01`;
        const finalEndDate = `${currentYear}-${paddedMonth}-${lastDayOfMonth}`;

        let oneWeekAgo = new Date(currentYear, currentMonth, 1);
        let oneWeekAfter = new Date(currentYear, currentMonth, lastDayOfMonth);

        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        oneWeekAfter.setDate(oneWeekAfter.getDate() + 7);

        const newStartDate = `${oneWeekAgo.getFullYear()}-${String(oneWeekAgo.getMonth()).padStart(2, '0')}-${String(oneWeekAgo.getDate()).padStart(2, '0')}`;
        const newEndDate = `${oneWeekAfter.getFullYear()}-${String(oneWeekAfter.getMonth()).padStart(2, '0')}-${String(oneWeekAfter.getDate()).padStart(2, '0')}`;
    
        // return { startDate: finalStartDate, endDate: finalEndDate };

        // const data = await getPersonalSchedule(localStorage.getItem('userId'), finalStartDate, finalEndDate);
        let data;
        console.log("sel", currentGroup);
        if(currentGroup.groupId === -1) {
            data = await getPersonalSchedule(localStorage.getItem('userId'), newStartDate, newEndDate, navigate);
        } else {
            data = await getGroupScehdule(currentGroup.groupId, localStorage.getItem('userId'), newStartDate, newEndDate, navigate);
        }

        console.log("tmp : ", data);

        handleData(data);
    }

    const darkenColor = (color) => {
        // color 값이 #으로 시작하는지 확인
        if (color.startsWith('#')) {
            console.log('darkenStart', color);
            // 시작하면 진행
            var rgb = color.substring(1) // # 제거
                .match(/.{1,2}/g) // 2자리씩 나눔
                .map(component => parseInt(component, 16)); // 16진수로 변환
    
            // 어두운 색상을 위해 RGB 값에 각각 20씩 감소시킴
            var darkerRgb = rgb.map(component => Math.max(component - 20, 0));
    
            // 감소된 RGB 값을 다시 16진수로 변환하여 새로운 색상 생성
            var darkerColor = '#' + darkerRgb.map(component => component.toString(16).padStart(2, '0')).join('');
            
            console.log('darkenFinish', darkerColor);
            return darkerColor;
        } else {
            return color;
        }
    }

    const handleData = (data) => {
        if (data) {
            const formattedEvents = data.map(item => {
                const eventStartMonth = new Date(item.startTime).getMonth();
                const eventEndMonth = new Date(item.endTime).getMonth();
                const savedMonth = new Date(localStorageDate).getMonth();
                console.log('data : ' + eventStartMonth + ' : es ' + eventEndMonth + ' : ee ' + savedMonth + ' : sm')
                // 특정 일정 색상 어둡게 하기 시도 중
                let backgroundColor = item.color;
                if(eventStartMonth !== savedMonth && eventEndMonth !== savedMonth) {
                    backgroundColor = darkenColor(item.color);
                }

                console.log("darken", backgroundColor);

                return {
                    start: new Date(item.startTime),
                    end: new Date(item.endTime),
                    title: item.title,
                    id: item.id,
                    color: item.color,
                    isPrivate: item.isPrivate,
                    style: { backgroundColor: item.color }, // 이벤트의 배경색을 설정
                }
            });
    
            console.log("format : ", formattedEvents);
    
            setEvents(formattedEvents);
    
            console.log("handle : ", events);
        }
    }
    

    useEffect(() => {
        const currentDate = savedDate;
            handleNavigate(currentDate);
    }, []);

    useEffect(() => {
        console.log("handle : ", events)
    }, [events]);

    useEffect(() => {
        if(selectedGroup) {
            console.log('sel2', selectedGroup);
            setCurrentGroup(selectedGroup);
        }
    }, [selectedGroup]);

    useEffect(() => {
        console.log('cur', currentGroup);
        const currentDate = savedDate;
        handleNavigate(currentDate);
    }, [currentGroup])
    

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

    // let initTime = can

    function getTextColorByBackgroundColor(hexColor) {
        if(!hexColor || !hexColor.startsWith('#')){
            return 'white'
        }

        const c = hexColor.substring(1)      // 색상 앞의 # 제거
        const rgb = parseInt(c, 16)   // rrggbb를 10진수로 변환
        const r = (rgb >> 16) & 0xff  // red 추출
        const g = (rgb >>  8) & 0xff  // green 추출
        const b = (rgb >>  0) & 0xff  // blue 추출
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709
        // 색상 선택
        return luma < 127.5 ? "white" : "black" // 글자색이
    }

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
                onNavigate={handleNavigate}
                defaultDate={savedDate == null ? new Date() : savedDate}
                eventPropGetter={(event, start, end, isSelected) => { //이벤트 스타일 바꾸는 함수 호출
                    return {
                        style: {
                            backgroundColor: event.color, //이벤트의 색상을 통신에서 받아온 색상으로
                            color: getTextColorByBackgroundColor(event.color), //이벤트 폰트색 검정으로
                            fontFamily : 'Noto Sans KR',
                        },
                    };
                }}
            />
        </div>
    );
};

export default MainCalendar;