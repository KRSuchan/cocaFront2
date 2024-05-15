import React, { useState } from 'react';
import axios from 'axios';
import { SketchPicker } from 'react-color'; // Color Picker를 위한 라이브러리
// import * as MainCalendar from './MainCalendar';

// const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
// }

// ✨ 추가, 수정, 삭제가 모두 가능한 페이지입니다.
// ✨ 수정 삭제하러 들어왔을 때에만 editingSchedule 에 수정할 이벤트정보가 담겨서 오게되어요
// ✨ 기존 저장버튼을 누르면 postSchedule 함수 실행했던 것이 saveSchedule 함수로 가도록 수정함

const AddSchedulePage = ({ setActivePanel, selectedDate, editingSchedule }) => {
    

    // if(typeof selectedDate === 'string') {
    //     selectedDate = new Date(selectedDate);
    // }

    // const [scheduleName, setScheduleName] = useState('');
    // const [scheduleDescription, setScheduleDescription] = useState('');

    const formatDate = (date) => {
        const tmpDate = new Date(date);

        const year = tmpDate.getFullYear();
        const month = String(tmpDate.getMonth() + 1).padStart(2, '0');
        const day = String(tmpDate.getDate()).padStart(2, '0');
        const hours = String(tmpDate.getHours()).padStart(2, '0');
        const minutes = String(tmpDate.getMinutes()).padStart(2, '0');
        const seconds = String(tmpDate.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };


    // 상태 초기화를 editingSchedule이 있을 경우 해당 데이터로 설정
    const [scheduleId, setScheduleId] = useState(editingSchedule ? editingSchedule.id : null);
    const [scheduleName, setScheduleName] = useState(editingSchedule ? editingSchedule.title : '');
    const [scheduleDescription, setScheduleDescription] = useState(editingSchedule ? editingSchedule.description : '');
    const [colorCode, setColorCode] = useState(editingSchedule ? editingSchedule.color : '#000000');
    const [startDate, setStartDate] = useState(
        editingSchedule && editingSchedule.start ? (editingSchedule.start) : selectedDate
    );
    const [endDate, setEndDate] = useState(
        editingSchedule && editingSchedule.end ? (editingSchedule.end) : selectedDate
    );
    const [location, setLocation] = useState(editingSchedule ? editingSchedule.location : '');
    const [isPrivate, setIsPrivate] = useState(editingSchedule ? editingSchedule.isPrivate : false);
    const [attachments, setAttachments] = useState(editingSchedule ? editingSchedule.attachments : [null, null]);
    
    const [showColorPicker, setShowColorPicker] = useState(false); // Color Picker 표시 여부를 관리하는 state

    // 첨부파일 변경 처리 함수
    const handleAttachmentChange = (event, index) => {
        // 선택된 파일을 attachments 배열에 설정
        const newAttachments = [...attachments];
        newAttachments[index] = event.target.files[0];
        setAttachments(newAttachments);
        
    };

    // 첨부파일 삭제 처리 함수
    const handleAttachmentDelete = (index) => {
        const newAttachments = [...attachments];
        newAttachments[index] = null; // 인덱스에 해당하는 첨부파일을 null로 설정
        setAttachments(newAttachments);
    };

    // 일정 추가 또는 수정 로직
    const saveSchedule = async () => { //✅ 저장버튼 혹은 수정버튼을 눌렀을때 
        const url = editingSchedule
            ? `${process.env.REACT_APP_SERVER_URL}/api/personal-schedule/update`
            : `${process.env.REACT_APP_SERVER_URL}/api/personal-schedule/add`;

        const method = editingSchedule ? 'put' : 'post';
        
        // ... 요청 데이터 구성 및 axios 요청
        if(method === 'post') {
            await postSchedule(url);
        } else {
            await postSchedule(url);
        }

    };
    // 일정 삭제 로직
    const deleteSchedule = async () => { // ✅ 삭제버튼을 눌렀을때
        // ... axios delete 요청
        const userId = localStorage.getItem('userId');
        const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/personal-schedule/delete?memberId=${userId}&personalScheduleId=${scheduleId}`);

        console.log(res);
    };
    
    const postSchedule = async (url) => {
        try {
            // const url = process.env.REACT_APP_SERVER_URL + '/api/personal-schedule/add';
    
            console.log(startDate);
            console.log(typeof startDate);
            console.log(scheduleName);
            
            let tmpAttachments = attachments;
            if(attachments[0] === null && attachments[1] === null) {
                tmpAttachments = null;
            }

            const requestData = {
                personalSchedule: {
                    title: scheduleName,
                    description: scheduleDescription,
                    location: location,
                    startTime: formatDate(startDate),
                    endTime: formatDate(endDate),
                    color: colorCode,
                    isPrivate: isPrivate
                },
                member: {
                    id: localStorage.getItem('userId')
                },
                attachments: tmpAttachments || null // attachments가 존재하지 않으면 null로 설정
            };

            console.log('rd', requestData);
    
            const response = await axios.post(url, requestData);
    
            console.log(response);
    
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
                    <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} /> {/* 날짜와 시간 선택 */}
                    <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} /> {/* 날짜와 시간 선택 */}
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="장소" />
                </div>
                {attachments.map((attachment, index) => (
                    <div className="form-group" key={index}>
                        <label htmlFor={`attachment-${index}`}>첨부파일 {index + 1}</label>
                        <input type="file" id={`attachment-${index}`} onChange={(e) => handleAttachmentChange(e, index)} />
                        {attachment && (
                            <div>
                                <a href={attachment.filePath} target="_blank" rel="noopener noreferrer">{attachment.fileName}</a>
                                <span style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }} onClick={() => handleAttachmentDelete(index)}>삭제</span>
                            </div>
                        )}
                    </div>
                ))}
                <button style= {{ height : '40px', color : colorCode, backgroundColor : colorCode}} onClick={() => setShowColorPicker(show => !show)}> {/* 색상 박스 클릭 시 Color Picker 표시 여부 토글 */}
                        <div style={{ background: colorCode }} /> {/* 선택된 색상 표시 */}
                        {showColorPicker && <SketchPicker color={colorCode} onChangeComplete={(color) => { setColorCode(color.hex); setShowColorPicker(false); }} />} {/* Color Picker */}
                    </button>
                <label className='col2'>
                        <p>비공개일정🔒</p>
                        <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
                    </label>
                {/* <button className="add-schedule-button" onClick={postSchedule}>일정추가</button> */}
                <button className="add-schedule-button" onClick={saveSchedule}>
                    {editingSchedule ? '수정' : '일정추가'}
                </button>
                {editingSchedule && (
                    <button className="add-schedule-button" onClick={deleteSchedule}>삭제</button>
                )}
            </div>
        </React.Fragment>
    );
};

export default AddSchedulePage;
