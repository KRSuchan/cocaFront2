// GroupsList.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

const GroupsList = () => {
    // Assume groups is an array of group names
    const groups = useSelector(state => state.groups);

    const [selectedGroup, setSelectedGroup] = useState('내 캘린더'); // 선택된 그룹을 추적하는 상태 변수를 추가합니다.

    // ✅ 그룹 선택시!
    const handleClick = (group) => {
        setSelectedGroup(group); // 클릭한 그룹을 선택된 그룹으로 설정합니다.
    };

    return (
        <div className="calendar-component">
            <ListGroup variant="flush">
                {groups.map(group => (
                    <ListGroup.Item 
                        style={{ 
                            borderRadius: '15px', 
                            backgroundColor: group === selectedGroup ? '#4CB3FF' : '#f8f9fa', // 선택된 그룹이면 배경색을 변경합니다.
                            color: group === selectedGroup ? 'white' : 'black', // 선택된 그룹이면 글자색을 변경합니다.
                            marginBottom: '10px', 
                            padding: '15px',
                            paddingLeft: '25px',
                            fontSize: '15pt',
                            fontFamily: 'Noto Sans KR', // 폰트를 설정합니다.
                            fontWeight: group === selectedGroup ? 'bold' : 'normal' // 선택된 그룹이면 글자를 굵게 합니다.
                        }} 
                        onClick={() => handleClick(group)}
                    >
                        {group}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default GroupsList;
