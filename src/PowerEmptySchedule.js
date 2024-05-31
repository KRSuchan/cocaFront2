import React, { useState, useEffect, useRef } from 'react';
import styles from './css/PowerEmptySchedule.module.css';
import { useNavigate } from 'react-router-dom';
import { Tabs, DatePicker, InputNumber, Select } from 'antd';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import moment from 'moment';
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일 추가

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const PowerEmptySchedule = () => {
    const navigate = useNavigate();
    const calendarRef = useRef(null);
    const [activeTab, setActiveTab] = useState('scheduleSearch'); // 'scheduleSearch' 또는 'timeSearch'
    const [number, setNumber] = useState(1); // 숫자 (N)
    const [unit, setUnit] = useState('일'); // '일', '시간'
    const [range, setRange] = useState(null); //시작일 끝일
    const [schedules, setSchedules] = useState([]);
    const [emptySchedules, setEmptySchedules] = useState([]); // 빈일정

    useEffect(() => {
        // 일정 데이터를 받아오는 함수
        const fetchSchedules = async () => {
            const data = [
                [
                    { startTime: "2024-05-01", endTime: "2024-07-01" },
                    { startTime: "2024-07-11", endTime: "2024-08-01" },
                    { startTime: "2024-09-21", endTime: "2024-12-31" },
                    { startTime: "2025-01-01", endTime: "2025-03-31" },
                    { startTime: "2025-04-01", endTime: "2025-06-30" }
                ],
                [
                    { startTime: "2024-06-01", endTime: "2024-08-01" },
                    { startTime: "2024-08-11", endTime: "2024-10-20" },
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

        fetchSchedules();
    }, []);

    useEffect(() => {
        // 빈일정 데이터를 받아오는 함수
        const fetchEmptySchedules = async () => {
            const emptyData = [
                { startTime: "2024-08-02", endTime: "2024-08-06" },
                { startTime: "2024-08-03", endTime: "2024-08-07" },
                { startTime: "2024-08-04", endTime: "2024-08-08" },
                { startTime: "2024-08-05", endTime: "2024-08-09" },
                { startTime: "2024-08-06", endTime: "2024-08-10" }
            ];
            setEmptySchedules([emptyData]); // 배열을 한 번 더 감싸서 배열의 배열로 만듭니다.
        };

        fetchEmptySchedules();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
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

    const handleSearch = () => {
        if (range && range.length === 2) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.gotoDate(range[0].toDate()); // 선택된 범위의 시작 날짜로 이동
            calendarApi.changeView('resourceTimelineYear'); // 뷰 타입만 변경
        }
    };

    const ScheduleSearch = () => {
        const events = schedules.flatMap((scheduleList, listIdx) =>
            scheduleList.map((schedule, idx) => ({
                id: `${listIdx}-${idx}`,
                resourceId: `member-${listIdx}`,
                start: schedule.startTime,
                end: schedule.endTime,
                title: `일정 ${listIdx + 1}-${idx + 1}`
            }))
        );

        const resources = schedules.map((_, idx) => ({
            id: `member-${idx}`,
            title: `멤버 ${idx + 1}`
        }));

        return (
            <FullCalendar
                ref={calendarRef}
                plugins={[resourceTimelinePlugin]}
                initialView="resourceTimelineDay"
                locale={koLocale} // 한국어 로케일 설정
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth,resourceTimelineYear,resourceTimelineQuarter'
                }}
                views={{
                    resourceTimelineYear: {
                        type: 'resourceTimeline',
                        duration: { years: 1 },
                        buttonText: '연간'
                    },
                    resourceTimelineQuarter: {
                        type: 'resourceTimeline',
                        duration: { months: 3 },
                        buttonText: '분기별'
                    }
                }}
                resources={resources}
                events={events}
                editable={true}
                selectable={true}
                eventOverlap={false}
                resourceAreaWidth="20%"
                slotMinWidth={100}
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
                    {activeTab === 'scheduleSearch' ? (
                        <Option value="일">일</Option>
                    ) : (
                        <>
                            <Option value="시간">시간</Option>
                        </>
                    )}
                </Select>
                <button onClick={handleSearch} style={{ backgroundColor: '#D06B74', color: 'white', marginLeft: '20px', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>찾기</button>
                <button style={{ backgroundColor: '#D06B74', color: 'white', marginLeft: '10px', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>초기화</button>
                <button style={{ backgroundColor: '#D06B74', color: 'white', marginLeft: '10px', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>일정추가</button>
            </div>
            <Tabs activeKey={activeTab} onChange={handleTabChange} className={styles.tabContainer} tabBarStyle={{ fontFamily: 'Noto Sans KR' }}>
                <TabPane tab={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>일자찾기</span>} key="scheduleSearch">
                    <div className={styles.mainPanel} style={{ height: '70vh' }}>
                        <ScheduleSearch />
                    </div>
                </TabPane>
                <TabPane tab={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>시간찾기</span>} key="timeSearch">
                    <div className={styles.mainPanel} style={{ height: '70vh' }}>
                        {/* 시간찾기 내용 */}
                    </div>
                </TabPane>
            </Tabs>
            
        </div>
    );
};

export default PowerEmptySchedule;



