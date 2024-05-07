import React from 'react';

const AddSchedulePage = ({ setActivePanel, selectedDate }) => (
    <React.Fragment>
        <div className='add-schedule-page'>
            <div className='col'>
                <h1>{selectedDate}</h1>
                <button onClick={() => setActivePanel('newPanel')}><</button>
            </div>
            <div className="add-schedule-form">
                {/* 여기에 일정 추가 폼을 구현하세요 */}
            </div>
            <button className="add-schedule-button">일정추가</button>
        </div>
    </React.Fragment>
);

export default AddSchedulePage;
