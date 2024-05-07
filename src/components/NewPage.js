import React from 'react';

const NewPage = ({ setActivePanel, selectedDate, schedule }) => (
    <React.Fragment>
        <div className='new-page'>
            <div className='col'>
                <h1>{selectedDate}</h1>
                <button onClick={() => setActivePanel('default')}>X</button>
            </div>
            <div className="schedule-list">
                {schedule.map((item, index) => (
                    <div key={index} className="schedule-card">
                        <div className="schedule-title">{item.title}</div>
                        <div className="schedule-content">{item.content}</div>
                    </div>
                ))}
            </div>
            <button className="add-schedule-button">일정추가</button>
        </div>
    </React.Fragment>
);

export default NewPage;