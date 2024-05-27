import React from 'react';
import Swal from 'sweetalert2';

const NewPage = ({ setActivePanel, selectedDate, schedule, setEditingSchedule, editingSchedule, selectedGroup }) => {
    const handleHeartClick = (item) => { //✌️ 하트 클릭했을때, 개인일정으로 저장
        // 하트 클릭 핸들러 함수
        console.log(`${item.title}의 하트를 클릭했습니다.`);
    };

    const handleImportMySchedule = () => {
        Swal.fire({
            title: '내일정 가져오기',
            text: `${selectedDate} 일자에 포함된 내 일정을 모두 가져옵니다`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                // 확인 버튼을 눌렀을 때 실행할 핸들러
                console.log(`${selectedDate} 일자에 포함된 내 일정을 가져옵니다.`);
            }
        });
    };

    return (
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
                                {selectedGroup.groupId !== -1 ? (
                                    <div className="schedule-hearts" onClick={() => handleHeartClick(item)}>
                                        ❤️ 123개
                                    </div>
                                ) : (
                                    <div className="schedule-privacy">{item.isPrivate ? '비공개일정🔒' : '공개일정🔓'}</div>
                                )}
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
                {selectedGroup.groupId === -1 && (
                    <button className="add-schedule-button" onClick={() => setActivePanel('addSchedule')}>일정추가</button>
                )}
                {selectedGroup.groupId !== -1 && selectedGroup.isAdmin && (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <button className="add-schedule-button" onClick={() => setActivePanel('addSchedule')} style={{ marginRight: '10px' }}>일정추가</button>
                        <button className="add-schedule-button" style={{ fontSize: '19px' }} onClick={handleImportMySchedule}>내일정가져오기</button>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default NewPage;