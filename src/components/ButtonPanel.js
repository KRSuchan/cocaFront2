import React from 'react';
import { Button } from 'antd';
import { SmileOutlined, SearchOutlined, StarOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ButtonPanel = () => {
    const navigate = useNavigate(); // 임시 로그아웃

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/");
    }

    const handleGroupClick = () => {
        navigate("/group");
    }


    return (
        <div className="button-panel">
            <Button icon={<SmileOutlined style={{ fontSize: '30px' }} />} className="button disappointment">
                <div>친구</div>
            </Button>
            <Button icon={<SearchOutlined style={{ fontSize: '30px' }} />} className="button green-color" onClick={handleGroupClick}>
                <div>그룹검색</div>
            </Button>
            <Button icon={<StarOutlined style={{ fontSize: '30px' }} />} className="button violet" >
                <div>빈일정</div>
            </Button>
            <Button icon={<SettingOutlined style={{ fontSize: '30px' }} />} className="button navy-blue" onClick={handleLogOut}>
                <div>내설정</div>
            </Button>
        </div>
    );
};
export default ButtonPanel;