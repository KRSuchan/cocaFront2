// GroupsList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';

const GroupsList = () => {
    const groups = useSelector(state => state.groups);
    const [selectedGroup, setSelectedGroup] = useState(useSelector(state => state.selectedGroup));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(selectedGroup.groupId === -1) {
            setSelectedGroup(groups[0]);
        }

        // TODO:
        // Redux로 상태관리 시 새로고침하면 정보가 날아감.
        // 선택된 그룹 부분을 일정 등록 후 새로고침을 하더라도 어떻게 유지할지 고민.
        // localStorage.. 는 만능이 아닌데...
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

    return (
        <div className="calendar-component">
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





