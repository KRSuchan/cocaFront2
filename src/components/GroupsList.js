// GroupsList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';

const GroupsList = () => {
    const groups = useSelector(state => state.groups);
    const [selectedGroup, setSelectedGroup] = useState(useSelector(state => state.selectedGroup));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(selectedGroup.groupId === -1) {
            setSelectedGroup(groups[0]);
        }

        console.log("groups444", groups);
    }, [groups])

    const handleClick = (group) => {
        setSelectedGroup(group);
        dispatch({ type: 'SELECT_GROUP', payload: group });
    };

    const handleSettingsClick = (group) => {
        if (group.isAdmin) {
            navigate(`/editgroup/${group.groupId}`);
        }
    };

    const handleDeleteClick = (group) => {
        if (group.groupId !== -1) {
            console.log(`Deleting group with ID: ${group.groupId}`);
        }
    };

    return (
        <div className="calendar-component" style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <ListGroup variant="flush">
                {groups.map(group => (
                    <ListGroup.Item 
                        key={group.groupId}
                        style={{ 
                            borderRadius: '15px', 
                            background: group === selectedGroup ? 'linear-gradient(to right, #2d69f4, #125BDC)' : '#f8f9fa',
                            color: group === selectedGroup ? 'white' : 'black',
                            marginBottom: '10px', 
                            padding: '15px',
                            paddingLeft: '25px',
                            fontSize: '15pt',
                            fontFamily: 'Noto Sans KR',
                            fontWeight: group === selectedGroup ? 'bold' : 'normal',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'background 0.3s ease'
                        }} 
                        onClick={() => handleClick(group)}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(to right, #91CCDF, #357ABD)';
                            e.currentTarget.querySelectorAll('.icon-hover').forEach(icon => icon.style.color = 'white');
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = group === selectedGroup ? 'linear-gradient(to right, #2d69f4, #125BDC)' : '#f8f9fa';
                            e.currentTarget.querySelectorAll('.icon-hover').forEach(icon => icon.style.color = 'gray');
                        }}
                    >
                        <span>{group.groupName}</span>
                        <div>
                            {group.isAdmin && (
                                <SettingOutlined 
                                    onClick={(e) => { e.stopPropagation(); handleSettingsClick(group); }} 
                                    style={{ color: 'gray', fontSize: '20px', marginRight: '10px', cursor: 'pointer' }} 
                                    className="icon-hover"
                                    onMouseOver={(e) => e.currentTarget.style.color = '#125BDC'}
                                    onMouseOut={(e) => e.currentTarget.style.color = 'gray'}
                                />
                            )}
                            {group.groupId !== -1 && (
                                <DeleteOutlined 
                                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(group); }} 
                                    style={{ color: 'gray', fontSize: '20px', cursor: 'pointer' }} 
                                    className="icon-hover"
                                    onMouseOver={(e) => e.currentTarget.style.color = 'red'}
                                    onMouseOut={(e) => e.currentTarget.style.color = 'gray'}
                                />
                            )}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default GroupsList;


