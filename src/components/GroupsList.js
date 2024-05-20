// GroupsList.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';

const GroupsList = () => {
    const groups = useSelector(state => state.groups);
    const [selectedGroup, setSelectedGroup] = useState(groups[0].groupName);
    const navigate = useNavigate();

    const handleClick = (group) => {
        setSelectedGroup(group.groupName);
    };

    const handleSettingsClick = (group) => {
        if (group.isAdmin) {
            navigate(`/editgroup/${group.groupId}`);
        }
    };

    return (
        <div className="calendar-component">
            <ListGroup variant="flush">
                {groups.map(group => (
                    <ListGroup.Item 
                        key={group.groupId}
                        style={{ 
                            borderRadius: '15px', 
                            backgroundColor: group.groupName === selectedGroup ? '#4CB3FF' : '#f8f9fa',
                            color: group.groupName === selectedGroup ? 'white' : 'black',
                            marginBottom: '10px', 
                            padding: '15px',
                            paddingLeft: '25px',
                            fontSize: '15pt',
                            fontFamily: 'Noto Sans KR',
                            fontWeight: group.groupName === selectedGroup ? 'bold' : 'normal',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }} 
                        onClick={() => handleClick(group)}
                    >
                        <span>{group.groupName}</span>
                        {group.isAdmin && (
                            <SettingOutlined onClick={(e) => { e.stopPropagation(); handleSettingsClick(group); }} style={{ color: 'gray', fontSize: '20px' }} />
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default GroupsList;
