import React, { useState } from 'react';
import axios from 'axios';
// import * as MainCalendar from './MainCalendar';

// const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
// }

const AddSchedulePage = ({ setActivePanel, selectedDate }) => {

    // if(typeof selectedDate === 'string') {
    //     selectedDate = new Date(selectedDate);
    // }

    const [scheduleName, setScheduleName] = useState('');
    const [scheduleDescription, setScheduleDescription] = useState('');
    const [colorCode, setColorCode] = useState('');
    const [startDate, setStartDate] = useState(selectedDate);
    const [endDate, setEndDate] = useState(selectedDate);
    const [location, setLocation] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [attachments, setAttachments] = useState(null);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const postSchedule = async () => {
        try {
            const url = 'http://localhost:8080/api/personal-schedule/add';
    
            console.log(startDate);
            console.log(typeof startDate);
            console.log(scheduleName);
    
            const requestData = {
                personalSchedule: {
                    title: scheduleName,
                    description: scheduleDescription,
                    location: location,
                    startTime: `${startDate} 00:00:00`,
                    endTime: `${endDate} 23:59:59`,
                    color: colorCode,
                    isPrivate: isPrivate
                },
                member: {
                    id: localStorage.getItem('userId')
                },
                attachments: attachments || null // attachments가 존재하지 않으면 null로 설정
            };
    
            const response = await axios.post(url, requestData);
    
            console.log(response.data.message);
    
            // MainCalendar.handleNavigate(startDate); 
            // post 후 화면에 내용 뿌려주기 필요.

            // 일단 임시방편
            window.location.reload();

            // return response.data;
    
        } catch (error) {
            console.error("일정 등록 에러: ", error);
            throw error; // 에러를 상위로 전파
        }
    }

    return (
        <React.Fragment>
            <div className='add-schedule-page'>
                <div className='col'>
                    <h1>{selectedDate}</h1>
                    <button onClick={() => setActivePanel('newPanel')}>X</button>
                </div>
                <div className="add-schedule-form">
                    <input type="text" value={scheduleName} onChange={(e) => setScheduleName(e.target.value)} placeholder="일정 이름" />
                    <input type="text" value={scheduleDescription} onChange={(e) => setScheduleDescription(e.target.value)} placeholder="일정 설명" />
                    <input type="text" value={colorCode} onChange={(e) => setColorCode(e.target.value)} placeholder="색상 코드" />
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="장소" />
                    <label>
                        <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />비공개 여부 체크
                    </label>
                </div>
                <button className="add-schedule-button" onClick={postSchedule}>일정추가</button>
            </div>
        </React.Fragment>
    );
};

export default AddSchedulePage;
