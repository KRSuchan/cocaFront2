import React from 'react';

const NewPage = ({ setActivePanel, selectedDate, schedule, setEditingSchedule , editingSchedule  }) => (
    <React.Fragment>
        <div className='new-page'>
            <div className='col' style={{backgroundColor: schedule.color}}>
                <h1>{selectedDate}</h1>
                <button onClick={() => setActivePanel('default')}>X</button>
            </div>
            <div className="schedule-list">
                {schedule.map((item, index) => (
                    <div key={index} className="schedule-card">
                        
                        <div className="schedule-title" style={{background: `linear-gradient(to right, ${item.color}, white)`}}
                             onClick={() => {
                                 setEditingSchedule(item); // 현재 편집할 일정을 상태로 설정
                                 setActivePanel('editSchedule'); // 편집 패널로 전환
                             }}>
                            {item.title}
                        </div>
                        <div className="col2">
                            <div className="schedule-location">{item.location}</div>
                            <div className="schedule-privacy">{item.isPrivate ? '비공개일정🔒' : '공개일정🔓'}</div>
                        </div>
                        <div className="schedule-content">{item.description}</div>

                        <div className="schedule-attachments">
                            {item.attachments.map((attachment, i) => (
                                <a key={i} href={attachment.filePath} target="_blank" rel="noopener noreferrer">
                                        <div className="attachment-name">💾 {attachment.fileName}</div>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button className="add-schedule-button" onClick={() => setActivePanel('addSchedule')}>일정추가</button>
        </div>
    </React.Fragment>
);

export default NewPage;
