import React, { useState } from 'react';

const AddSchedulePage = ({ setActivePanel, selectedDate }) => {
    const [scheduleName, setScheduleName] = useState('');
    const [scheduleDescription, setScheduleDescription] = useState('');
    const [colorCode, setColorCode] = useState('');
    const [startDate, setStartDate] = useState(selectedDate);
    const [endDate, setEndDate] = useState(selectedDate);
    const [location, setLocation] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

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
                <button className="add-schedule-button">일정추가</button>
            </div>
        </React.Fragment>
    );
};

export default AddSchedulePage;
